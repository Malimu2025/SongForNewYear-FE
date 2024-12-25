import React, { useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { ImageDownloadButton } from './ImageDownloadButton';
import { Button } from '../Button';
import twitter from '../../assets/ResultPage/twitter_icon.svg';
import kakao from '../../assets/ResultPage/kakao_icon.svg';
import copylink from '../../assets/ResultPage/copylink_icon.svg';
import spark from '../../assets/ResultPage/light_object.svg';
import { useNavigate } from 'react-router-dom';

export const BelowContents = ({ onCapture, videoCode }) => {
    const nav = useNavigate();
    const shareUrl = window.location.href; // 배포 주소로 바꾸기
    const twitterText = `[OO님을 위한 새해첫곡]%0A🎵행운을 빌어줘 - 원필%0A" 내 앞길에 행운을 빌어줘 "%0A원하는 대로 다 이룰 수 있는 새해가 될 거예요🌅%0A새해 첫곡 고르러 가기▶️`;

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
    };

    const shareOnKakao = () => {
        if (window.Kakao) {
            window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: 'OO님을 위한 새해첫곡',
                    description: `🎵행운을 빌어줘 - 원필\n" 내 앞길에 행운을 빌어줘 "\n원하는 대로 다 이룰 수 있는 새해가 될 거예요🌅`,
                    imageUrl: '',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
                buttons: [
                    {
                        title: '노래 보러 가기',
                        link: {
                            mobileWebUrl: shareUrl,
                            webUrl: shareUrl,
                        },
                    },
                ],
            });
        } else {
            alert('클립보드에 카카오톡 공유 링크가 복사되었습니다!');
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('공유 링크가 복사되었습니다!');
        });
    };

    // useEffect(() => {
    //     if (!window.Kakao?.isInitialized()) {
    //         window.Kakao.init('REACT_APP_KAKAO_KEY');
    //     }
    // }, []);

    return (
        <BelowContainer>
            <ImageDownloadButton onClick={onCapture} />
            <ShareContainer>
                <TitleText>공유하기</TitleText>
                <ShareIcons>
                    <Icon src={twitter} onClick={shareOnTwitter}/>
                    <Icon src={kakao} onClick={shareOnKakao}/>
                    <Icon src={copylink} onClick={copyLink}/>
                </ShareIcons>
            </ShareContainer>
            <Text>
                지금까지 nnn명이<br />이 노래를 추천받았어요
            </Text>
            <TitleText>
                바로 들어보고 싶다면
            </TitleText>
            <YouTubeContainer>
                <Spark src={spark} />
                <YouTube 
                    videoId={videoCode}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            modestbranding: 1,
                        },
                    }}
                    onEnd={(e)=>{e.target.stopVideo(0);}}
                />
            </YouTubeContainer>
            <ButtonsContainer>
                <Button text="다른 소원 빌기" color="yellow" isActive={true} onClick={() => nav('/')} />
                <Button text="노래 전체 목록 보기" color="brown" isActive={true} onClick={() => nav('/songlist')} />
            </ButtonsContainer>
        </BelowContainer>
    );
};

const BelowContainer = styled.div`
    @media (min-width: 501px) {
        width: 31.25rem; // 500px
        margin: 0 auto;
    }
    width: 100%;
    padding-left: 3.25rem;
    padding-right: 3.25rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ShareContainer = styled.div`
    width: 100%;
    margin-top: 2.56rem;
    margin-bottom: 2.88rem;
    padding-left: 3.25rem;
    padding-right: 3.25rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.div`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1.44rem;
    color: #ACA298;
`;

const TitleText = styled.div`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const Icon = styled.img`
    cursor: pointer;
`;

const ShareIcons = styled.div`
    display: flex;
    width: 15rem;
    justify-content: space-between;
    align-items: center;
`;

const Spark = styled.img`
    position: absolute;
    top: -3.5rem;
    right: -3.5rem;
    z-index: 10;
`;

const YouTubeContainer = styled.div`
    width: 100%;
    max-width: 25rem;
    position: relative;
    overflow: visible;
    background: #ACA298;

    &::before {
        content: "";
        display: block;
        padding-top: 56.25%; 
        /* 16:9 비율 유지 */
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        max-width: 25rem;
    }

    @media (max-width: 480px) {
        max-width: 20rem;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2.35rem;
`;