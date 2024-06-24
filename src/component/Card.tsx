import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowCircleLeft, faArrowCircleRight, faCopy, faLightbulb,faImage,faSmile, faSave,faEdit } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import '../Styles/card.css';
import {  Circle, CircleDot } from "lucide-react"

interface TextItem {
  id: number;
  content: string;
  position: { x: number; y: number };
}

interface Card {
  url: string;
  alt:string;
  content: string;
  textItems: TextItem[];
}

const Card: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    { url: 'https://storage.googleapis.com/groupgreeting/assets/images/covers/HBD-awesome-co-workers-PR-2021.gif', alt: "Car One", content: '', textItems: [] },
    { url: 'https://www.google.com/imgres?q=give%20me%20white%20screen&imgurl=https%3A%2F%2Fcommunity.getmailspring.com%2Fuploads%2Fdefault%2Foriginal%2F2X%2F8%2F858260b10f94d982ba1b6be3f573dc26b8822ca6.png&imgrefurl=https%3A%2F%2Fcommunity.getmailspring.com%2Ft%2Fwhite-screen-of-death%2F1450&docid=4WG04s8KqPszcM&tbnid=0mxIINcrLhxieM&vet=12ahUKEwiJo7nM0NaGAxV8cfUHHdaMAswQM3oECFgQAA..i&w=1913&h=1048&hcb=2&ved=2ahUKEwiJo7nM0NaGAxV8cfUHHdaMAswQM3oECFgQAA', alt: "Car Two", content: '', textItems: [] },
    { url: 'https://www.google.com/imgres?q=give%20me%20white%20screen&imgurl=https%3A%2F%2Fcommunity.getmailspring.com%2Fuploads%2Fdefault%2Foriginal%2F2X%2F8%2F858260b10f94d982ba1b6be3f573dc26b8822ca6.png&imgrefurl=https%3A%2F%2Fcommunity.getmailspring.com%2Ft%2Fwhite-screen-of-death%2F1450&docid=4WG04s8KqPszcM&tbnid=0mxIINcrLhxieM&vet=12ahUKEwiJo7nM0NaGAxV8cfUHHdaMAswQM3oECFgQAA..i&w=1913&h=1048&hcb=2&ved=2ahUKEwiJo7nM0NaGAxV8cfUHHdaMAswQM3oECFgQAA', alt: "Car Three", content: '', textItems: [] },
    { url: 'https://www.linearity.io/blog/content/images/2023/06/how-to-create-a-car-NewBlogCover.png', alt: "Car Four", content: '', textItems: [] }
  ]);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);
  const [linkToCopy] = useState<string>('https://www.groupgreeting.com/sign/d12e60c5ec0db9c');
  const [offsetPercentage, setOffsetPercentage] = useState(106);
// const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const showPrevCard = () => {
    setCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setIsEditing(false);
    setCurrentEditingId(null);
  };

  const showNextCard = () => {
    setCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setIsEditing(false);
    setCurrentEditingId(null);
  };

  const handleAddTextItem = () => {
    const newItem = {
      id: Date.now(),
      content: '<p>New Text</p>',
      position: { x: 50, y: 50 },
    };
    const updatedCards = [...cards];
    updatedCards[cardIndex].textItems.push(newItem);
    setCards(updatedCards);
  };
         
  const handleTextChange = (id: number, content: string) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedTextItems = card.textItems.map(item =>
          item.id === id ? { ...item, content } : item
        );
        return { ...card, textItems: updatedTextItems };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleDragStop = (id: number, x: number, y: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedTextItems = card.textItems.map(item =>
          item.id === id ? { ...item, position: { x, y } } : item
        );
        return { ...card, textItems: updatedTextItems };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      const confirmed = window.confirm('Link copied to clipboard! Do you want to proceed?');
      if (confirmed) {
        console.log('User confirmed');
        // Additional actions can be performed here
      } else {
        console.log('User canceled');
        // Handle cancellation if needed
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setOffsetPercentage(110);
      } else {
        setOffsetPercentage(106);
      }
    };

    handleResize(); // Set the initial value
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sliderCards = document.querySelectorAll('.card-slider-card');

    sliderCards.forEach((card) => {
      const htmlCard = card as HTMLElement;
      const transformValue = `translateX(${(-offsetPercentage) * cardIndex}%)`;
      htmlCard.style.setProperty('--card-transform', transformValue);
    });
  }, [cardIndex, offsetPercentage]);

  const handleTextClick = (id: number) => {
    setCurrentEditingId(id);
  };

  const openTextEditor = (id: number) => {
    setIsEditing(true);
    setCurrentEditingId(id);
    setTimeout(() => {
      const editor = document.querySelector('.ql-editor') as HTMLElement;
      if (editor) {
        editor.setAttribute('tabindex', '-1');
        editor.focus();

        // Manually trigger touch event listeners
        const touchEvent = new TouchEvent('touchstart', { bubbles: true, cancelable: true });
        editor.dispatchEvent(touchEvent);
      }
    }, 0);
  };
  useEffect(() => {
    const editor = document.querySelector('.ql-editor') as HTMLElement;
    if (editor) {
      const logTouchEvent = (event: TouchEvent) => {
        console.log('Touch event triggered:', event);
      };
      editor.addEventListener('touchstart', logTouchEvent);
      editor.addEventListener('touchmove', logTouchEvent);
      editor.addEventListener('touchend', logTouchEvent);

      return () => {
        editor.removeEventListener('touchstart', logTouchEvent);
        editor.removeEventListener('touchmove', logTouchEvent);
        editor.removeEventListener('touchend', logTouchEvent);
      };
    }
  }, [currentEditingId]);
  
  const saveTextEditor = () => {
    setIsEditing(false);
    
  };

  return (
    <div className="card-slider">
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '95%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginLeft: '-5%',
          zIndex: 3,
          width: '50%'
        }}
      >
        {cardIndex > 0 && (
          <>
            <button onClick={handleAddTextItem} className="add-btn">
              <FontAwesomeIcon icon={faPen} className="icon" fontSize={20} />
              <span className="text">Add Text</span>
            </button>
            <button onClick={() => console.log('Add Image')} className="add-btn">
              <FontAwesomeIcon icon={faImage} className="icon" fontSize={20} />
              <span className="text">Add Image</span>
            </button>
            <button onClick={() => console.log('Add GIF')} className="add-btn">
              <FontAwesomeIcon icon={faSmile} fontSize={20} className="icon" />
              <span className="text">Add GIF</span>
            </button>
          </>
        )}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="card-slider-card"
            style={{
              transition: 'transform 0.5s ease-in-out',
              position: 'relative',
              backgroundImage: card.url ? `url(${card.url})` : 'none',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              objectFit: 'cover',
            }}
          >
            {card.textItems.map(item => (
              <Rnd
                key={item.id}
                size={{ width: 'auto', height: 'auto' }}
                position={item.position}
                onDragStop={(_, d) => handleDragStop(item.id, d.x, d.y)}
                disableDragging={isEditing && currentEditingId === item.id}
                bounds="parent"
                dragHandleClassName="draggable"
              >
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    fontFamily: 'Arial, sans-serif',
                    zIndex: 6, // Set the z-index higher
                    border: currentEditingId === item.id && !isEditing ? '1px dashed #ccc' : 'none',
                    padding: '5px',
                    minHeight: '20px',
                    backgroundColor: currentEditingId === item.id ? 'lightyellow' : 'transparent',
                    cursor: 'pointer',
                    position: 'relative',
                    maxWidth: '100%', // Ensure it doesn't overflow the screen
                    boxSizing: 'border-box'
                  }}
                  onClick={() => handleTextClick(item.id)}
                  onTouchEnd={() => handleTextClick(item.id)}
                  className="draggable"
                >
                  {currentEditingId === item.id && !isEditing && (
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        cursor: 'pointer',
                        zIndex: 2,
                      }}
                      onClick={() => openTextEditor(item.id)}
                      onTouchStart={() => openTextEditor(item.id)}
                    />
                  )}
                  {isEditing && currentEditingId === item.id ? (
                    <div>
                      <ReactQuill
                        value={item.content}
                        onChange={(content) => handleTextChange(item.id, content)}
                        modules={{
                          toolbar: [
                            [{ header: '1' }, { header: '2' }, { font: [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image', 'video'],
                            [{ color: [] }, { background: [] }],
                            ['clean'],
                          ],
                        }}
                        formats={[
                          'header',
                          'font',
                          'size',
                          'bold',
                          'italic',
                          'underline',
                          'strike',
                          'blockquote',
                          'list',
                          'bullet',
                          'link',
                          'image',
                          'video',
                          'color',
                          'background',
                        ]}
                        theme="snow"
                      />
                      <button onClick={saveTextEditor} style={{ marginTop: '10px' }} onTouchEnd={saveTextEditor}>
                        <FontAwesomeIcon icon={faSave} fontSize={20} />
                      </button>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  )}
                </div>
              </Rnd>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={showPrevCard}
        className="card-slider-btn"
        style={{ marginRight: '300px' }}
        aria-label="View Previous Card"
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} fontSize={40} />
      </button>
      <button
        onClick={showNextCard}
        className="card-slider-btn"
        style={{ marginLeft: '90%' }}
        aria-label="View Next Card"
      >
        <FontAwesomeIcon icon={faArrowCircleRight} fontSize={40} />
      </button>
      <div style={{ bottom: 50 }}>
        <FontAwesomeIcon icon={faLightbulb} fontSize={30} style={{ color: '#ffab00' }} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '.25rem',
        }}
      >
        {cards.map((_, index) => (
          <button
            key={index}
            className="card-slider-dot-btn"
            aria-label={`View Card ${index + 1}`}
            onClick={() => {
              setCardIndex(index);
              setIsEditing(false);
              setCurrentEditingId(null);
            }}
          >
            {index === cardIndex ? <CircleDot aria-hidden /> : <Circle aria-hidden />}
          </button>
        ))}
      </div>
      <div id="after-card-slider-controls" />
      <div className="copy-link-container">
        <p className="copy-link-text">{linkToCopy}</p>
        <FontAwesomeIcon icon={faCopy} className="copy-link-icon" onClick={handleButtonClick} style={{ color: '#a6a4a4' }} />
      </div>
    </div>
  );
};

export default Card;
