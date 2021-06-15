import React from 'react'

const RestaurantList = () => {
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
                    <tr>
                        <td>Sushi</td>
                        <td>San Francisco</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

export default RestaurantList
