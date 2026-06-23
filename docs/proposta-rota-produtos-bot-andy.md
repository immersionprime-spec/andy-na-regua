# Proposta: rota GET /api/produtos no bot-andy

Aplicar manualmente em `src/booking.mjs`, dentro do bot-andy. Não aplicado automaticamente.

## Import a adicionar (linha do import existente de db.mjs)

Trocar:
```js
import { enfileirarMensagem, getServicosAtivos, getServico, getConfig } from './db.mjs'
```
Por:
```js
import { enfileirarMensagem, getServicosAtivos, getServico, getConfig, getProdutosEmEstoque } from './db.mjs'
```

## Rota nova a adicionar (logo após o bloco de GET /api/servicos)

```js
// GET /api/produtos — vitrine pública, somente leitura, sem secret
bookingRouter.get('/api/produtos', (req, res) => {
  const produtos = getProdutosEmEstoque().map(p => ({
    id: p.id,
    nome: p.nome,
    descricao: p.descricao || '',
    preco: p.preco,
  }))
  res.json({ produtos })
})
```

## Por que assim
- Usa `getProdutosEmEstoque()`, função que já existe em `db.mjs` — nenhuma query nova.
- Reaproveita o `corsMiddleware` já aplicado a todo o `bookingRouter` (linha
  `bookingRouter.use(corsMiddleware)`) — não precisa de CORS próprio.
- Sem secret/auth, isolada do padrão de `panel.mjs` — exatamente como decidido.
- Não altera nenhuma rota existente, nenhuma tabela, nenhum arquivo além de `booking.mjs`.

## Observação de segurança (recomendação, aplicar a critério do responsável)
Como é uma rota pública nova, considerar rate-limit leve (ex: middleware simples por IP)
para evitar scraping de estoque ou sobrecarga do SQLite — não é bloqueante para o
funcionamento, é um reforço de robustez.
