"use client"

import {useEffect, useState} from 'react'
import Header from '../../../../../components/shared/Header'
import { transformationTypes } from '../../../../../constants'
import TransformationForm from '../../../../../components/shared/TransformationForm'
import { set } from 'mongoose'

const AddTransformationTypePage = ({params: {type}}:SearchParamProps) => {
  const transformation = transformationTypes[type]
  const [userId, setUserId] = useState('');
  const [creditBalance, setCreditBalance] = useState(0);

  const getUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data._id);
        setCreditBalance(data.creditBalance);
      } else {
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      <Header 
        title={transformation.title} 
        subtitle={transformation.subTitle}
        />
        <section>
          <TransformationForm 
            action='Add'
            userId={userId}
            type={transformation.type as TransformationTypeKey}
            creditBalance={creditBalance}
          />
        </section>
    </>
  )
}

export default AddTransformationTypePage