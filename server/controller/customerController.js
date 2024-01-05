const { customer } = require("../modal/customerModal")


exports.addcustomer = async (req, res) => {
    try {
        const data = await customer.create(req.body)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomer = async (req, res) => {
    try {
        const data = await customer.find().populate('product.product_name')
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomerbyId = async (req, res) => {
    try {
        const data = await customer.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}


exports.updatecustomer = async (req, res) => {
    try {
        const data = await customer.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deletecustomer = async (req, res) => {
    try {
        const data = await customer.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.addentry = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, products } = req.body;

        const buyer = await customer.findById(id);
        if (!buyer) return res.status(404).send('Buyer not found');

        buyer.dailyEntries.push({ date, products });
        await buyer.save();

        res.status(200).send(buyer);
    } catch (error) {
        res.status(400).send(error);
    }
}


exports.report = async (req, res) => {
    try {
        const { id } = req.params;

        const buyer = await customer.findById(id);
        if (!buyer) return res.status(404).send('Buyer not found');

        const monthlyReport = buyer.dailyEntries.reduce((acc, entry) => {
            const month = new Date(entry.date).getMonth() + 1; // 1-based month

            entry.products.forEach(product => {
                acc[month] = acc[month] || {};
                acc[month][product.type] = (acc[month][product.type] || 0) + product.quantity;
            });

            return acc;
        }, {});

        res.status(200).send(monthlyReport);
    } catch (error) {
        res.status(400).send(error);
    }
}


exports.addallentry = async (req,res) => {
    try {
        const { dailyEntries } = req.body;

        if (!dailyEntries || !Array.isArray(dailyEntries)) {
            return res.status(400).send('Invalid data format');
        }

        for (const entry of dailyEntries) {
            const { id, date, products } = entry;

            const buyer = await customer.findById(id);
            if (!buyer) continue; // Skip to next iteration if buyer not found

            buyer.dailyEntries.push({ date, products });
            await buyer.save();
        }

        res.status(200).send('Bulk daily entries added successfully');
    } catch (error) {
        res.status(400).send(error);
    }
}