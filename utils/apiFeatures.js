class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        const queryObj = {...this.queryString};
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        const defaultSort = '_id';

        let sortBy = defaultSort;
        if (this.queryString.sort) {
            sortBy = this.queryString.sort.split(',').join(' ');
        }
        this.query = this.query.sort(sortBy);

        return this;
    }

    limitFields() {
        const defaultFields = '-__v';

        let fields = defaultFields;
        if (this.queryString.fields) {
            fields = this.queryString.fields.split(',').join(' ');
        }
        this.query = this.query.select(fields)

        return this;
    }

    paginate() {
        const defaultPage = 1;
        const defaultLimit = 100;

        const page = parseInt(this.queryString.page) || defaultPage;
        const limit = parseInt(this.queryString.limit) || defaultLimit;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;