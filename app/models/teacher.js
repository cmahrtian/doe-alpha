// grab the sequelize module
var sequelize = require('sequelize');

// define our teacher model
// module.exports allows us to pass this to other files when it is called
module.exports = function(sequelize, DataTypes) {
	var Teacher = sequelize.define('Teacher', 
		{
			employeeID: DataTypes.INTEGER,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			schoolDBN: DataTypes.STRING,
			locationDescription: DataTypes.STRING,
			fiscalYear: DataTypes.INTEGER,
			motpOptionID: DataTypes.STRING,
			motpOptionDescription: DataTypes.STRING,
			numOfObs: DataTypes.INTEGER,
			numOfMissingObs: DataTypes.INTEGER
		}
	);
}