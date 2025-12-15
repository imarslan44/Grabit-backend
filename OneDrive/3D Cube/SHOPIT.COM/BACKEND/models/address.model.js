import mongoose  from "mongoose"

const AddressSchema = new mongoose.Schema({

    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    mobile: {type: String,
             trim: true,
             required: [true, "mobile number is required"],
             minLength: 10,
             maxLength: 12,
            },
    pincode: {type: String,
             trim: true,
             required: [true, "Pin code is required"],
            
            },
    city: {type: String,
             trim: true,
             required: [true, "city is required"],
        
            },
    street: {type: String,
             trim: true,
             required: [true, "street is required"],
            
            },
    landmark: {type: String,
               trim: true,
               required: [true, "Landmark is required"],
               minLength: 10,
               maxLength: 12,
            },


    
})

const Address = mongoose.models.Address || mongoose.model("Address",  AddressSchema);

export default Address;
