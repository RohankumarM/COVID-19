import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';

const alanKey = 'cd6942a2e494b4e00f020a5f3dcd6a202e956eca572e1d8b807a3e2338fdd0dc/stage';

function News() {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticles(-1);
        }
        else if (command === 'highlights') {
          setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20){
            alanBtn().playText('Please try again. ');
          }
          else if(article){
            window.open(articles[parsedNumber].url, '_blank');
            alanBtn().platText('Opening');
          }
        }
      }
    });
  }, [])

  return (
    <div className="news">
      <h1>Alan AI News Application</h1>
      <NewsCards articles={newsArticles} activeArticles={activeArticles} />

    </div>
  )
}

export default News;
