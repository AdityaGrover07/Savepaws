# Savepaws
# Paws Adoption

> Paws Adoption is a animal help & adoption community platform for animal lovers

<img src="https://user-images.githubusercontent.com/54525688/230685185-0938fbdd-5ee2-4b47-9980-3c0726efa67c.png" data-canonical-src="https://user-images.githubusercontent.com/54525688/230685185-0938fbdd-5ee2-4b47-9980-3c0726efa67c.png" width="200" height="200" />

## Brief


## ⬇️ Flow



<br />

## Future Aspects
- 

## Technology used

React, Node, Mongoose, Socket.io, AWS-S3, Nodemailer, JEST, Multer

<br/>

## ⬇️ How to run the project

### ☑️ Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Please make sure you've already installed node v16 in your machine, If not use nvm.

### Frontend

```
npm install 
```

### Backend

```
npm install 
```

.env
```
DB_URL=
AWS_KEY=
AWS_SECRET=
AWS_S3_REGION=
PAWS_EMAIL=
PAWS_PASSWORD=
JWT_SECRET=
```

### Global Fonts

- font-family: "Cinzel", "Cormorant" - https://fonts.google.com/

## Dataset

For more info: https://www.kaggle.com/competitions/petfinder-adoption-prediction/data
<br/>


<b>Pets</b>
- PetID - Unique hash ID of pet profile
- Type - Type of animal (1 = Dog, 2 = Cat, 3=Cow, 4=Cat)
- Name - Name of pet (Empty if not named)
- Age - Age of pet when listed, in months
- Breed1 - Primary breed of pet (Refer to BreedLabels dictionary)
- Gender - Gender of pet (1 = Male, 2 = Female, 3 = Mixed, if profile represents group of pets)
- Color1 - Color 1 of pet (Refer to ColorLabels dictionary)
- Vaccinated - Pet has been vaccinated (1 = Yes, 2 = No, 3 = Not Sure)
- Sterilized - Pet has been spayed / neutered (1 = Yes, 2 = No, 3 = Not Sure)
- Health - Health Condition (1 = Healthy, 2 = Minor Injury, 3 = Serious Injury, 0 = Not Specified)
- State - State location
- City - City location
- RescuerID - Unique hash ID of rescuer
- Description - Profile write-up for this pet. The primary language used is English, with some in Malay or Chinese.
- PhotoAmt - Total uploaded photos for this pet

