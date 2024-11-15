import React, { useState, useEffect } from 'react'
import PetCards from './PetCards'

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = process.env.REACT_APP_BASE_URL;
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${endpoint}/approvedPets`)
      if (!response.ok) {
        throw new Error('An error occurred')
      }
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchRequests()
  }, [])

  return (
    <div className='pet-container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        requests.length > 0 ? (
          requests.map((request, index) => (
            <PetCards key={request._id} pet={request} updateCards={fetchRequests} deleteBtnText={"Delete Post"} approveBtn={false}/>
          ))
        ) : (
          <p>No Approved Pets available</p>
        )
      )}
    </div>
  )
}

export default ApprovedRequests
