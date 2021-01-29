import React, { useEffect, useState } from 'react'
import './Home.css'
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import { useStateValue } from './StateProvider';

function Home() {

    const [{ searchString }, dispatch] = useStateValue();

    const [searchText, setSearchText] = useState('');
    const [chese, setChese] = useState([
        {
            id: '12341234',
            title: 'Once a Super computer, You can achieve anyting in your life.',
            price: '81.96',
            rating: 5,
            image: 'https://icdn5.digitaltrends.com/image/dell-xps-15-2-in-1-review-front-display-720x720.jpg'
        },
        {
            id: '12341238',
            title: 'Very Strong Television, with HD video quality and good Sound',
            price: '21.96',
            rating: 4,
            image: 'https://images.freekaamaal.com/post_images/1558072557.jpg'
        },
        {
            id: '12341237',
            title: 'Life Long Telescope: High Tech And Super Reliable',
            price: '31.96',
            rating: 3,
            image: 'https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/c20gqydyxbbt0jo0_1593062345.jpeg?tr=w-812,h-464'
        },
        {
            id: '12341235',
            title: 'A very good drone for Anyting, Spy Work, Shipping, Everything',
            price: '51.96',
            rating: 5,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcMd_TjNoYC9kXFd5LW2saPhEnnMxaXgZ7jw&usqp=CAU'
        }
    ]);

    useEffect(() => {

    }, [searchString]);

    return (
        <div className='home'>
            <div>
                {console.log(searchString)}
            </div>
            <div className='home__gridBox'>
                <Grid container spacing={3}>
                    {chese.map(item => (
                        <Grid xs={12} sm={6} className='home__grid'>
                            { item.title.match(`[^.]*${searchString}[^.]*\.`)
                             ?  
                            <Product id = {item.id} 
                                title = {item.title} 
                                price = {item.price} 
                                rating = {item.rating} 
                                image = {item.image} 
                            /> 
                            : ''}
                        </Grid>
                    ))}
                </Grid>
                
                {/* {chese.map(item => (
                    <Product
                        id = {item.id}
                        title = {item.title}
                        price = {item.price}
                        rating = {item.rating}
                        image = {item.image}
                    />
                ))} */}
            </div>
        </div>
    )
}

export default Home
