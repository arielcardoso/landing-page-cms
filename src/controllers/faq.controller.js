const {v4:uuid} = require('uuid');
const faq = require('../models/faq.model');

const idFilter = req => (member) => member.id === req.params.id

exports.getAllMember = (req, res) => {
    res.json(faq);
}

exports.getOneMember = (req, res) => {
    const found = faq.some(idFilter(req)) //with helper function

    if(found){
        res.json(faq.filter(member => member.id === req.params.id))
    }else{
        //400 = bad request
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }
}

exports.createMember = (req, res) => {
    const newItem = {
        id: uuid(),
        status: 'active',
        ...req.body
    }
    faq.push(newItem);
    // res.redirect('/');
    res.json(faq);
}

exports.updateMember = (req, res) => {
    const found = faq.some(idFilter(req));

    if(found){
        const updatedItem = faq.map(item => {
            if(updatedItem.id === req.params.id){
                return {
                    ...item,
                    ...req.body
                }
            }
            return item;
        });
        res.json({ msg: 'Question updated', updatedItem})

    }else{
        res.status(400).json({ msg: `Unable to update. Question of id ${req.params.id} does not exist.`});
    }
}

exports.deleteQuestion = (req, res) => {
    const found = faq.some(idFilter(req));

    if(found){
        res.json({
            msg: 'Question deleted successfully!',
            faq: faq.filter(item => item.id !== req.params.id)
        })
    }else{
        res.status(400).json({ msg: `No question with the id of ${req.params.id} found`});
    }
}


