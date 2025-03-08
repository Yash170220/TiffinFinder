import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Container,
    Divider,
} from '@mui/material';

const AboutUs = () => {
    return (
        <Container
            maxWidth='md'
            sx={{
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                mb: '8rem',
                mt: '4rem',
                borderRadius: '1rem',
            }}
        >
            <Typography
                variant='h3'
                align='center'
                gutterBottom
                sx={{ color: '#3f51b5' }}
            >
                About Us
            </Typography>

            <Typography variant='body1' paragraph sx={{ lineHeight: 1.6 }}>
                Welcome to our Tiffin Service, where we are passionate about
                bringing healthy, homemade meals to your doorstep. Our mission
                is to offer fresh, nutritious, and flavorful food that caters to
                busy individuals, professionals, and families who want to enjoy
                home-cooked meals without the hassle of cooking.
            </Typography>

            <Typography variant='h4' sx={{ fontWeight: 600, marginTop: 2 }}>
                Our Story
            </Typography>
            <Typography variant='body1' paragraph sx={{ lineHeight: 1.6 }}>
                Tiffin Service was created with the vision of simplifying
                mealtime for people who lead busy lives but still value the
                importance of eating healthy and delicious food. In today's
                fast-paced world, it's not always easy to find the time to cook,
                and that's where we come in. Our service provides an easy,
                convenient, and affordable way to enjoy nutritious homemade
                meals, made from high-quality ingredients and prepared with love
                and care.
            </Typography>

            <Typography variant='h4' sx={{ fontWeight: 600, marginTop: 2 }}>
                What We Offer
            </Typography>
            <Typography variant='body1' paragraph sx={{ lineHeight: 1.6 }}>
                We provide a wide range of meal options tailored to meet the
                needs and preferences of our customers. Whether you're looking
                for vegetarian meals, non-vegetarian options, or
                dietary-specific dishes, we’ve got you covered. Our menu is
                designed to be balanced and varied, ensuring that there’s
                something for everyone.
            </Typography>

            <Typography variant='h4' sx={{ fontWeight: 600, marginTop: 2 }}>
                Why Choose Us?
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Quality Ingredients: We use fresh, locally
                                sourced ingredients to prepare all of our meals.
                                Each dish is carefully crafted to provide you
                                with the nutrition you need to power through
                                your day.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Homemade Goodness: No preservatives or
                                artificial additives – just delicious,
                                home-cooked meals that remind you of your
                                favorite family recipes.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Customizable Meal Plans: We understand that
                                everyone has different dietary preferences and
                                needs. Whether you're looking to lose weight,
                                maintain a healthy lifestyle, or simply enjoy a
                                satisfying meal, we offer customizable meal
                                plans to suit your needs.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Convenient Delivery: Our service is designed for
                                your convenience. We offer reliable and timely
                                delivery to ensure that you receive your meals
                                hot and fresh, right at your doorstep.
                            </Typography>
                        }
                    />
                </ListItem>
            </List>

            <Typography variant='h4' sx={{ fontWeight: 600, marginTop: 2 }}>
                Our Vision
            </Typography>
            <Typography variant='body1' paragraph sx={{ lineHeight: 1.6 }}>
                We aim to revolutionize the way people think about food
                delivery. We want to make it easy for everyone to enjoy healthy,
                home-cooked meals without the stress of cooking or worrying
                about unhealthy takeout options. Our goal is to provide our
                customers with the best tiffin service experience – one meal at
                a time.
            </Typography>

            <Typography variant='h4' sx={{ fontWeight: 600, marginTop: 2 }}>
                Our Values
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Customer Satisfaction: Our customers are at the
                                heart of everything we do. We strive to exceed
                                your expectations with every meal and ensure
                                your experience is enjoyable.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Sustainability: We are committed to reducing our
                                environmental footprint. We use eco-friendly
                                packaging, source ingredients responsibly, and
                                continuously seek ways to improve our operations
                                in an environmentally conscious manner.
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                Health & Wellness: We believe in the power of
                                good food to fuel your body and mind. Our meals
                                are designed to support a healthy lifestyle,
                                ensuring that you get the nutrients you need
                                without compromising on taste.
                            </Typography>
                        }
                    />
                </ListItem>
            </List>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant='body1' paragraph>
                Thank you for choosing us to be part of your mealtime. We are
                excited to serve you and hope you enjoy our delicious and
                nutritious meals! Feel free to modify the content according to
                your specific goals or add more personal touches! If you need
                any changes or additions, just let me know!
            </Typography>
        </Container>
    );
};

export default AboutUs;
