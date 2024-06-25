import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  transform: 'translateY(50%)',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserDetailsContainer = styled.div(() => ({
  display :'flex',
  flexDirection :'row',
  justifyContent : 'space-between',
  padding : '0.5rem'
}));

const NameBox = styled.div(()=>({
  display : 'flex',
   justifyContent :'center',
   alignItems :'center',
   width: '4rem',
   height : '4rem',
   backgroundColor : '#87f5a8',
   fontSize : '2rem',
   borderRadius :  '50%',
}))

const NameEmail =  styled.div(()=>(
  {
    fontSize : '1rem',
    display : 'flex',
    flexDirection :'column',
    '& > h2': {
      fontSize : '1rem',
  },
  }
))
const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [user, setUser] = useState(null);
  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/v1/users/user`, {
          params: { userId: post?.userId },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [post?.userId]);
  return (
    <PostContainer>
      <UserDetailsContainer>
          <NameBox>
            LG
          </NameBox>
          <NameEmail>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </NameEmail>
      </UserDetailsContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={image.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId : PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default Post;
