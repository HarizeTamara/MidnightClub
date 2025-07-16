import { recipesMidnight } from './Recipes.js';
import { ingredientCosts } from './IngredientCostsMidnight.js';

function populateRecipeSelect() {
  const sel = document.getElementById('recipe-select');
  Object.keys(recipesMidnight).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

const emojiMap = {
  'Lingote de Ferro':'🔩',
  'Lingote de Cobre':'🥉',
  'Lingote de Aluminio':'🥈',
  'Plástico':'🧩',
  'Borracha':'🦠',
  'Maçarico':'🧨',
  'Máscara de Solda':'🎭',
  'Folha de Coca':'🍃',
  'Galão de Combustivel Vazio':'🛢️',
  'Solvente':'🧪',
};

function calculateRecipe() {
  const name = document.getElementById('recipe-select').value;
  const qty = parseInt(document.getElementById('recipe-quantity').value);
  const res = document.getElementById('calculation-result');
  if (!name || qty < 1) {
    res.textContent = 'Selecione receita e quantidade válida.';
    return;
  }
  const rec = recipesMidnight[name];
  const totalYield = rec.yield * qty;
  const priceEach = rec.Price.toFixed(2);
  const priceTotal = (rec.Price * totalYield).toFixed(2);

  let cost = 0;
  let ingHTML = '<ul>';
  rec.ingredients.forEach(i => {
    const qtyTot = i.quantity * qty;
    const cst = (ingredientCosts[i.name] || 0) * qtyTot;
    cost += cst;
    ingHTML += `<li>${emojiMap[i.name]||''} ${i.name}: ${qtyTot} (U$ ${cst.toFixed(2)})</li>`;
  });
  ingHTML += '</ul>';

  const lucro = (priceTotal - cost).toFixed(2);

  res.innerHTML = `
    <strong>${name}</strong><br>
    Quantidade total: ${totalYield}<br>
    Preço total de venda: U$ ${priceTotal}<br>
    <strong style="color:darkred">Custo de produção: U$ ${cost.toFixed(2)}</strong><br>
    <strong style="color:darkgreen">Lucro estimado: U$ ${lucro}</strong><br><br>
    Ingredientes:<br>${ingHTML}
  `;
}

populateRecipeSelect();
document.getElementById('calculate-btn').addEventListener('click', calculateRecipe);
