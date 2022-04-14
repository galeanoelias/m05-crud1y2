const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => {
	fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8')
};
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products,
			toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = Number(req.params.id)
		let product = products.find(elem => elem.id == id)
		res.render('detail', {
			product,
			toThousand
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let { name, price, discount, category, description } = req.body;

		let lastId = 1;
		products.forEach(element => {
			if(element.id > lastId) {
				lastId = element.id
			}
		});

		let newProduct = {
			id: lastId + 1,
			name,
			price: Number(price),
			discount: Number(discount),
			category,
			description,
			image: req.file ? req.file.filename : "default-image.png"
		};

		products.push(newProduct);
		writeJson(products);

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = Number(req.params.id);
		let productEdit = products.find(elem => elem.id == id);

		res.render('product-edit-form', {
			product: productEdit
		});
	},
	// Update - Method to update
	update: (req, res) => {
		let id = Number(req.params.id)
		let { name, price, discount, category, description } = req.body;

		products.forEach(element => {
			if(element.id == id) {
				element.id = element.id;
				element.name = name;
				element.price = Number(price);
				element.discount = Number(discount);
				element.description = description;
				element.image = req.file ? req.file.filename : element.image
			}
		});

		writeJson(products);

		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = Number(req.params.id)

		newProducts = products.filter(elem => elem.id !== id)

		if(newProducts) {
			writeJson(newProducts)
		} else {
			console.log("No se encuentra producto")
		};
		res.redirect('/products')
	}
};

module.exports = controller;