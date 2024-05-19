const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// unmark goal as complete
exports.uncompleteGoal = function uncompleteGoal (req, res) {
    const { errorID } = idSchema.validate(req.params);
    if(errorID) return res.status(400).send(errorID);

    const { id } = req.params;

    connection.query(`UPDATE goals SET completed = 0 WHERE id = ?`, [id], (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send('Internal server error');
        } else {
            res.status(201).send('Goal was marked as not completed');
        }
    });
};