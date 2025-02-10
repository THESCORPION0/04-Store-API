import Product from '../models/product.js';

const getAllProduct = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObject = {};

	// Check if query parameter exists
	if (featured) {
		queryObject.featured = featured === 'true';
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'<': '$lt',
			'<=': '$lte',
			'=': '$eq',
		};
		const regEx = /\b(<|>|<=|>=|=)\b/g;
		const filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
		const options = ['price', 'rating'];
		filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	let result = Product.find(queryObject);

	// Apply sorting if sort parameter is provided
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	// Apply field selection
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}

	// Pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	// Execute query
	const products = await result;
	res.status(200).json({ Products: products, nbHits: products.length });
};



export { getAllProduct }