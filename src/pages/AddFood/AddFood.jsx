import React, {useState} from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/FoodService';
import { toast } from 'react-toastify';



const AddFood = () => {

    const [image, setImage] =useState(false);

    const [data, setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'Biryani'
    });

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data =>({...data,[name]:value}));
    }

    const onSubmitHandler = async (event) =>{
            event.preventDefault();
            if(!image){
                toast.error('Please select an image');
                return;
            }
            
            try{
             await addFood(data, image);
             toast.success('Food added sucessfully.');
             setData({name:'',description:'',category:'Biryani',price:''});
             setImage(null);
            }catch(error){
              toast.error('Error adding food.')
            }

    }
    

  return (
    <div className="mx-3 mt-3">
  <div className="row ">
    <div className="card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Add Food</h2>
        <form onSubmit={onSubmitHandler}>

        <div className="mb-3">
            <label htmlFor="image" className="form-label">
                <img src={image ? URL.createObjectURL(image): assets.upload} alt="" width={70} height={70}/>
                
            </label>
            <div><b>Click on Uploads</b></div>
            <input type="file" className="form-control" id="image"  hidden onChange={(e) => setImage(e.target.files[0])}/>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Food Name</label>
            <input type="text" placeholder='Chicken Biryani' className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" placeholder='Write content here.....' id="description" rows="5" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
          </div>

           <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select name="category" id="category" className='form-control' onChange={onChangeHandler} value={data.category}>
                <option value="Biryani">Biryani</option>
                <option value="Cake">Cake</option>
                <option value="Buger">Buger</option>
                <option value="Pizza">Pizza</option>
                <option value="Rolls">Rolls</option>
                <option value="Salad">Salad</option>
                <option value="Egg">Egg</option>
                <option value="Chicken">Chicken</option>
                <option value="Cookies">Cookies</option>
                <option value="Fryies">Fryies</option>
                <option value="Fish">Fish</option>
                <option value="Noodle">Noodle</option>
                <option value="Ice Cream">Ice cream</option>
            </select>
          </div>
           <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number"name='price' placeholder='&#8377;200' id='price' className='form-control' onChange={onChangeHandler} value={data.price} />
            
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddFood;
