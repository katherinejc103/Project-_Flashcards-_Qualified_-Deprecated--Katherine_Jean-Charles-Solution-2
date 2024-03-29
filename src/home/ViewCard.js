import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {readCard} from ".././utils/api"

export default function ViewCard({key, card}){
    console.log(card)
    const {cardId} = useParams()
    console.log(cardId)

    useEffect(() =>{
        async function readCard(){
        try{
        const card = await readCard(cardId)
        // console.log(card)
        }
        catch (error) {
        console.error('Error loading card:', error);
        }
            }
            readCard(); 
            return () => {
            };
            }, [cardId])

    return (
        <>
        </>
    )
}