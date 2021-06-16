import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    let history = useHistory();

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    


    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await RestaurantFinder.get("/")
                console.log(res)
                setRestaurants(res.data.data.restaurants)
            } catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    const handleDelete = async (id) => {
        try {
            const res = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
                //if restaurant id does not match the id we are trying to delete, we will add it to the array
            }))
        } catch(err){
            console.log(err)
        }
    }

    const handleUpdate = async (id) => {
        history.push(`/restaurants/${id}/update`);
    }

    return (
        <div className="list-group">
            <table className="table table-dark table-hover">
                <thead className="bg-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return(
                            <tr key ={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>Sushi</td>
                        <td>San Francisco</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
            
        </div>
    )
}

export default RestaurantList
