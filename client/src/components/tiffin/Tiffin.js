import React, { forwardRef, useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Container,
    Dialog,
    IconButton,
    Slide,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Close from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Lazy, Navigation, Zoom, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swipper.css';

import 'swiper/css/pagination';

import { useValue } from '../../context/ContextProvider';

const Transition = forwardRef((props, ref) => {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Tiffin = () => {
    const {
        state: { tiffin, currentUser },
        dispatch,
    } = useValue();

    const [address, setAddress] = useState(null);
    const [likedByUser, setLikedByUser] = useState(false);
    const [dislikedByUser, setDislikedByUser] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (tiffin) {
            console.log('Tiffin:', tiffin);
            dispatch({
                type: 'START_LOADING',
            });

            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${tiffin.lng},${tiffin.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => setAddress(data.features[0]));

            async function getTiffins(dispatch) {
                await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/tiffin/bytiffin/${tiffin.tiffinId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.token}`,
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.success) {
                            dispatch({
                                type: 'UPDATE_TIFFIN',
                                payload: result.result,
                            });
                        } else {
                            dispatch({
                                type: 'UPDATE_ALERT',
                                payload: {
                                    open: 'true',
                                    severity: 'error',
                                    message: result.message,
                                },
                            });
                        }
                    });
            }

            if (!tiffin.images || !tiffin.likes) {
                getTiffins(dispatch);
            }

            const likedByUser = tiffin?.likes?.some(
                (like) => like.uid === currentUser?.id
            );
            setLikedByUser(likedByUser);
            const dislikedByUser = tiffin?.dislikes?.some(
                (dislike) => dislike.uid === currentUser?.id
            );
            setDislikedByUser(dislikedByUser);
            dispatch({
                type: 'END_LOADING',
            });
        }
    }, [tiffin]);

    const handleClose = () => {
        dispatch({
            type: 'UPDATE_TIFFIN',
            payload: null,
        });
    };

    const likeTiffin = async () => {
        if (likedByUser) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'error',
                    message: 'You have already liked this tiffin',
                },
            });
            return;
        }
        if (dislikedByUser) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'error',
                    message: 'You have already disliked this tiffin',
                },
            });
            return;
        }
        const { id: uid, name: uName, photoURL: uPhoto } = tiffin;
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}/tiffin/like/${tiffin._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.token}`,
                },
                body: JSON.stringify({ uid, uName, uPhoto }),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: 'UPDATE_TIFFIN',
                        payload: result.result,
                    });
                } else {
                    dispatch({
                        type: 'UPDATE_ALERT',
                        payload: {
                            open: 'true',
                            severity: 'error',
                            message: result.message,
                        },
                    });
                }
            });
    };

    const dislikeTiffin = async () => {
        if (likedByUser) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'error',
                    message: 'You have already liked this tiffin',
                },
            });
            return;
        }
        if (dislikedByUser) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'error',
                    message: 'You have already disliked this tiffin',
                },
            });
            return;
        }
        const { id: uid, name: uName, photoURL: uPhoto } = tiffin;
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}/tiffin/dislike/${tiffin._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.token}`,
                },
                body: JSON.stringify({ uid, uName, uPhoto }),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: 'UPDATE_TIFFIN',
                        payload: result.result,
                    });
                } else {
                    dispatch({
                        type: 'UPDATE_ALERT',
                        payload: {
                            open: 'true',
                            severity: 'error',
                            message: result.message,
                        },
                    });
                }
            });
    };

    const getNutriInfo = async (imageURL) => {
        dispatch({ type: 'START_LOADING' });
        try {
            const response = await fetch(
                'https://tiffin-fastapi.onrender.com/analyze',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image_url: imageURL }),
                }
            );
            const data = await response.json();
            console.log('Parsed data:', data.summary);
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'info',
                    message: data.summary,
                },
            });
        } catch (error) {
            console.error('Fetch error:', error);
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: 'true',
                    severity: 'error',
                    message: 'Error fetching nutrition information',
                },
            });
        } finally {
            dispatch({ type: 'END_LOADING' });
        }
    };

    return (
        <Dialog
            fullScreen
            open={Boolean(tiffin)}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position='relative'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='h6'
                        sx={{ ml: 2, flex: 1 }}
                    >
                        {tiffin?.title}
                    </Typography>
                    <IconButton color='inherit' onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ pt: 5 }}>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    onSlideChangeTransitionEnd={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                    }
                    zoom={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={true}
                    modules={[
                        EffectCoverflow,
                        Zoom,
                        Lazy,
                        Navigation,
                        Pagination,
                    ]}
                    effect='coverflow'
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                >
                    {tiffin?.images.map((url) => (
                        <SwiperSlide key={url}>
                            <div className='swiper-zoom-container'>
                                <img
                                    loading='lazy'
                                    src={url}
                                    alt={tiffin?.title}
                                />
                            </div>
                        </SwiperSlide>
                    ))}

                    <AutoGraphIcon
                        sx={{
                            fontSize: '2rem',
                            color: '#fff',
                            padding: 1,
                            zIndex: 10,
                            backgroundColor: '#1976d2',
                            borderRadius: '50%',
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                transform: 'scale(0.95)',
                            },
                        }}
                        aria-label='Get Nutrition Information'
                        onClick={() => {
                            getNutriInfo(tiffin?.images[activeIndex]);
                        }}
                    />
                </Swiper>
                <Stack sx={{ p: 3 }} spacing={2}>
                    <Stack
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Price per day: '}
                            </Typography>
                            <Typography component='span'>
                                {tiffin?.price === 0
                                    ? 'Free Tiffin'
                                    : ' $' + tiffin?.price}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                borderRadius: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    padding: 1,
                                    borderRadius: 5,
                                    color: 'success.main',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={likeTiffin}
                            >
                                {likedByUser ? (
                                    <ThumbUpIcon
                                        sx={{
                                            fontSize: '1.5rem',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                ) : (
                                    <ThumbUpOffAltIcon
                                        sx={{
                                            fontSize: '1.5rem',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                )}
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontWeight: 500,
                                        minWidth: 20,
                                        textAlign: 'center',
                                    }}
                                >
                                    {tiffin?.likes?.length}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: 'error.main',
                                    padding: 1,
                                    borderRadius: 5,
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={dislikeTiffin}
                            >
                                {dislikedByUser ? (
                                    <ThumbDownIcon
                                        sx={{
                                            fontSize: '1.5rem',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                ) : (
                                    <ThumbDownOffAltIcon
                                        sx={{
                                            fontSize: '1.5rem',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                )}
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontWeight: 500,
                                        minWidth: 20,
                                        textAlign: 'center',
                                    }}
                                >
                                    {tiffin?.dislikes?.length}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Tiffin Service Name: '}
                            </Typography>
                            <Typography component='span'>
                                {tiffin?.title}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Address: '}
                            </Typography>
                            <Typography component='span'>
                                {address?.place_name}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack>
                        <Typography variant='h6' component='span'>
                            {'Details: '}
                        </Typography>
                        <Typography component='span'>
                            {tiffin?.description}
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
};

export default Tiffin;
