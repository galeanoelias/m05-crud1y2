const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsInSale = products.filter(elem => elem.category == "in-sale")
		let productsVisited = products.filter(elem => elem.category == "visited")
		res.render('index', {
			productsInSale,
			productsVisited,
			toThousand
		});
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
