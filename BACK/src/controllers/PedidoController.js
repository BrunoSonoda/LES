/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Pedido from '../models/Pedido';
import PedidoItem from '../models/PedidoItem';
import Camiseta from '../models/Camiseta';
import Cupom from '../models/Cupom'; // Importação necessária

class PedidoController {
  async store(req, res) {
    try {
      const {
        endereco_id, itens, cartoes, cupons,
      } = req.body;
      const cliente_id = req.userId;

      let subtotal = 0;

      // 1. Validar Estoque
      for (const item of itens) {
        const camiseta = await Camiseta.findByPk(item.camiseta_id);
        if (!camiseta || camiseta.quantidade_estoque < item.quantidade) {
          return res.status(400).json({ errors: [`Estoque insuficiente para o item ${item.camiseta_id}`] });
        }
        subtotal += Number(camiseta.preco) * item.quantidade;
      }

      // 2. Cálculo de Frete
      const valorFrete = subtotal > 200 ? 0 : 25.00;

      // --- MODIFICAÇÃO: Lógica para utilizar a variável 'cupons' ---
      let descontoTotal = 0;
      if (cupons && cupons.length > 0) {
        // Buscamos os cupons enviados no array 'cupons' (que podem ser os códigos strings)
        const cuponsEncontrados = await Cupom.findAll({
          where: {
            codigo: cupons,
            ativo: true,
          },
        });

        // Somamos o valor de todos os cupons válidos encontrados
        descontoTotal = cuponsEncontrados.reduce((acc, cupom) => acc + Number(cupom.valor), 0);

        // Opcional: Inativar os cupons de troca após o uso (RN0036)
        for (const cupom of cuponsEncontrados) {
          if (cupom.tipo === 'TROCA') {
            await cupom.update({ ativo: false });
          }
        }
      }

      // 3. Cálculo do Valor Final
      // Valor Total = (Subtotal + Frete) - Descontos
      const valorFinal = (subtotal + valorFrete) - descontoTotal;
      const totalSeguro = valorFinal < 0 ? 0 : valorFinal; // Evita valor negativo

      // 4. Validar Pagamento (Mínimo R$ 10 por cartão)
      if (cartoes && cartoes.length > 1) {
        const pagamentoInvalido = cartoes.some((c) => Number(c.valor) < 10);
        if (pagamentoInvalido) {
          return res.status(400).json({ errors: ['O valor mínimo por cartão é R$ 10,00.'] });
        }
      }

      // 5. Criar o Pedido com o valor já calculado
      const pedido = await Pedido.create({
        cliente_id,
        endereco_id,
        valor_total: totalSeguro,
        frete: valorFrete,
      });

      // 6. Registrar Itens e Baixar Estoque
      for (const item of itens) {
        const camiseta = await Camiseta.findByPk(item.camiseta_id);
        await PedidoItem.create({
          pedido_id: pedido.id,
          camiseta_id: item.camiseta_id,
          quantidade: item.quantidade,
          valor_unitario: camiseta.preco,
        });

        await camiseta.update({
          quantidade_estoque: camiseta.quantidade_estoque - item.quantidade,
        });
      }

      return res.json({
        pedido,
        desconto_aplicado: descontoTotal,
        valor_final: totalSeguro,
      });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao processar compra.'] });
    }
  }
}

export default new PedidoController();
