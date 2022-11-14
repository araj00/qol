import React  from 'react'
import Slide from '../../componants/Slide'
import './test.css'

const Test = () => {

  return (
    <div className="container vh100">
    <div className="carousel slide" data-interval="1000000" data-ride="carousel" id="feedbackTest">
       <Slide/>
    </div>
  </div>
  )
}

export default Test