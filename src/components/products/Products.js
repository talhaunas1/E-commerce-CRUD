import React, { useState } from 'react'
import data from './Data'
import Modal from 'react-modal';
// import { useState } from 'react'



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%'
    },
};


export default function Products() {

    const [Products, setProducts] = useState(data)
    // console.log("data is showing here" , products)
    const [modal, setModal] = useState(false)

    //create a state for every input in a form
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [isEdit,setEdit] = useState(null)


    const onDeleteHandler = (id) => {
        // alert(id) 
        const response = window.confirm("Are you Sure?")
        if (!response) {
            return
        }
        const filteredProduced = Products.filter((item) => item.id !== id)
        setProducts(filteredProduced)
    }
     
    const onEditHandler = (item) => {
        // console.log(item)
        setTitle(item.title)
        setDescription(item.description)
        setCategory(item.category)
        setPrice(item.price)
        setImage(item.image)
        setEdit(item.id)
        setModal(true)
    }

    //submit button
    const onSubmitHanddler = () => {
        // console.log("title", title)
        // console.log("description",description)
        // console.log("category",category)
        // console.log("price",price)
        // console.log("image",image)

        if (!(title && description && category && price && image)) {
            alert('fill all blanks')
            return
        }
        let newProducts = {
            id: Math.round(Math.random() * 12345),
            title: title,
            description: description,
            category: category,
            price: price,
            image: image
        }
        setProducts([newProducts, ...Products])
        onModalCloseHandler()
    }


    const onUpdateHanddler =() => {
        
        if (!(title && description && category && price && image)) {
            alert('fill all blanks')
            return
        }
        let updateProducts = {
            id:isEdit,
            title: title,
            description: description,
            category: category,
            price: price,
            image: image,
        }
        const updatedProduct = Products.map((item)=> {
            if (item.id === isEdit) {
                return updateProducts
            }
            return item
        })
        
        setProducts(updatedProduct)
        onModalCloseHandler()
        
    }
    
    const onModalCloseHandler = () => {
        setTitle(null)
        setDescription(null)
        setCategory(null)
        setPrice(null)
        setImage(null)
        setEdit(null)
        setModal(false)
    }


    return (
        <div style={{ padding: 50 }}>
            <div style={{}}>
                <h1>List of Products</h1>
                <button onClick={() => setModal(true)}>Add items</button>
            </div>
            <table>
                {/* <tbody> */}
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>

                {Products.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td><img style={{ width: 50 }} src={item.image} /></td>
                            <td><button onClick={() => onDeleteHandler(item.id)}>Delete</button></td>
                            <td><button onClick={()=>onEditHandler(item)}>Edit</button></td>

                        </tr>
                    )
                })}
                {/* </tbody> */}
            </table>


            <Modal
                isOpen={modal}
                onAfterOpen={() => null}
                onRequestClose={onModalCloseHandler}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='row'>
                    <div className='col-md-10'>
                        {isEdit ?<h4 >Update the Product</h4> :
                        <h4 >Add New Product</h4>
                    }
                    </div>
                    <div className='col-md-2'>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setModal(false)}></button></div>
                </div>


                <form>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label"> Tilte</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Title" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label"> Description</label>
                        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Description" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label"> Category</label>
                        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Catogery" />
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label"> Price</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Price" />
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label"> image</label>
                        <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} id="exampleFormControlInput1" placeholder="Enter The Image URL" />
                    </div>

                    <br />
                    {isEdit ?  <button style={{ margin: 30 }} type='button' onClick={onUpdateHanddler} className="btn btn-info"> update</button>:
                    <button style={{ margin: 30 }} type='button' onClick={onSubmitHanddler} className="btn btn-info"> submit</button>
                    }
                    
                </form>
            </Modal>
        </div>
    )
}

