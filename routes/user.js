const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { UserModel, TodoModel } = require("../database");
const bcrypt = require('bcrypt'); 
const z = require("zod");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const USER_JWT_SECRET=process.env.USER_JWT_SECRET;

const userRouter = Router();

// User Routes
userRouter.post('/signup', async (req, res) => {
    // Implement user signup logic

    // zod validation
    const requiredBody = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(8).max(15),
        username: z.string().min(3).max(15),
    });
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    // Check if validation failed
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            msg: "Invalid input.",
            errors: parsedDataWithSuccess.error.errors, // Better detail of the validation errors
        });
    }

    // Destructure validated data from parsedDataWithSuccess
    const { email, password, username } = parsedDataWithSuccess.data;

    try {
        // Hash the password
        const hashedPass = await bcrypt.hash(password, 5);
       

        // Create the user
        await UserModel.create({
            email,
            password: hashedPass,
            username,
        });

        // Respond with success message
        res.status(200).json({
            msg: `Signup succeeded for user ${username} with email ${email}`,
        });
    } catch (error) {
        // Handle any errors during user creation
        res.status(500).json({
            msg: "Error: something went wrong!",
            error: error.message || error,
        });
    }
});


userRouter.post('/login', async (req, res) => {
     // Implement user login logic
     const email = req.body.email;
     const password = req.body.password;
    
     const user = await UserModel.findOne({
        email: email
     })

     if(!user){
        res.status(403).json({
            msg: "user not found!"
        })
        return;
     }
     //todo: check for the hashed password
     const passMatch = await bcrypt.compare(password, user.password);

     if(passMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, USER_JWT_SECRET);
        console.log("token: ", token);
        res.json({
            token: token,
            user: {
                "id": user._id,
                "username": user.username,
                "email": user.email
            }
        })
     }else{
        res.status(405).json({
            msg: "incorrect creadentials"
        })
     }
});

userRouter.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user

    
    try {
        const userId = req.user._id;

        // Fetch all todos for the user from the database
        const todos = await TodoModel.find({ userId: userId }); // Use the TodoModel for the query

        // Send the todos as a response
        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        
        // Check if response has already been sent
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

});

userRouter.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports ={
    userRouter: userRouter
}