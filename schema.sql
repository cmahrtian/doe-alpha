CREATE TABLE teachers (
	EmployeeID CHAR(7) NOT NULL,
	FirstName VARCHAR(15),
	LastName VARCHAR(15),
	Email VARCHAR(50),
	SchoolDBN CHAR(6) NOT NULL
);

CREATE TABLE observation_selections (
	EmployeeID VARCHAR(7) NOT NULL,
	FiscalYear INT NOT NULL,
	MOTPOptionID CHAR(1) NOT NULL,
	MOTPOptionDescription TEXT,
	expected_obs INT
);

CREATE TABLE observations (
	EmployeeID VARCHAR(7) NOT NULL,
	FiscalYear INT NOT NULL,
	MOTPID INT NOT NULL,
	MOTPDate DATETIME,
	MOTPMonth VARCHAR(9),
	MOTPDay INT,
	MOTPYear INT,
	TimePeriod VARCHAR(200),
	SchoolDBN CHAR(6) NOT NULL,
	LocationDescription VARCHAR(100),
	MOTPTypeID INT,
	MOTPTypeDescription VARCHAR(100) NOT NULL,
	EvaluatorName VARCHAR(100),
	Comments VARCHAR(6000)
);

CREATE TABLE components (
	EmployeeID VARCHAR(7) NOT NULL,
	FiscalYear INT NOT NULL,
	MOTPID INT NOT NULL,
	MOTPComponentID INT NOT NULL,
	MOTPComponentWeight CHAR(4),
	MOTPComponentDescription VARCHAR(6000) NOT NULL,
	Rating INT NOT NULL,
	ComponentRationale VARCHAR(3000)
);

CREATE TABLE yoy_scores (
	EmployeeID VARCHAR(7) NOT NULL,
	Component VARCHAR(2),
	Y16_Mean_Component_Score NUMERIC(4,2),
	Y16_Weighted_Component_Score NUMERIC(6,4),
	Y15_Mean_Component_Score NUMERIC(4,2),
	Y15_Weighted_Component_Score NUMERIC(6,4)
);