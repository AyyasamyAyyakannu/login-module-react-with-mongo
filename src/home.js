import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Home = (props) => {

    const [json, setJson] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5555/api/get-admin',{
            headers: {'auth' : `${localStorage.getItem('auth')}`}
        }).then(res => {
            // request success
            setJson(res.data)
		})
		.catch(err => {
			// handle error
			console.log(err.response.data);
		})
    },[])

    return(
        <React.StrictMode>
            <div className="app-form">
                <div className="form-title">Admin List</div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Terms & Conditions</th>
                            {/* <th>Update</th>
                            <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            json.length > 0 ?
                            (
                                json.map(e => 
                                    <tr key={e._id}>
                                        <td>{e.FirstName}</td>
                                        <td>{e.Email}</td>
                                        <td>{e.Mobile}</td>
                                        <td>{e.Accept ? "True": "False"}</td>
                                        {/* <td><input type="button" onClick={
                                            props.GetData(e)
                                        } value="Edit" className="btn btn-primary" /></td>
                                        <td><input type="button" onClick={
                                            props.DelData(e)
                                        } value="Delete" className="btn btn-danger" /></td> */}
                                    </tr>
                                )
                            )
                            :
                            (
                                <tr>
                                    <td colSpan="4">No data..</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => {
                    localStorage.clear()
                    props.history.push('/login')
                    toast.success("Logged out successfully.")
                }}> Logout </button>
            </div>
        </React.StrictMode>
    )
}

export default Home;