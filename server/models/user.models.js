const UserSchema = new Schema {
    {
        firstName: {
            type: String, 
            required: [true, "First name required"], 
            minlength: [],
        }
    }
}