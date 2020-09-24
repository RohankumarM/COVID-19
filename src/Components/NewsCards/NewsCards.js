import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from '../NewsCards/styles.js';

const infoCards = [
  { color: '#00838f', title: 'News by Source', info: 'CNN, BBC, BuzzFeed, The Times of India, Hindustan Times, The Indian Express', text: 'Give me the  news from CNN'},
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, Coronavirus, Smartphones, Donald Trump...', text: 'What\'s up with Coronavirus' },
  { color: '#283593', title: 'Open news headlines with Commands', text: 'Open the article 4' },
];

const NewsCards = ({ articles, activeArticles }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => {
            return (
              <Grid item xs={12} sm={6} md={4} ls={3} className={classes.infoCard}>
                <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                  <Typography variant="h5">{infoCard.title}</Typography>
                  {infoCard.info ? <Typography variant="h6">
                    <strong>{infoCard.title.split(' ')[2]}:
                    </strong>
                    <br />
                    {infoCard.info}
                  </Typography> : null}

                  <Typography variant="h6">Try Saying: <br /> <i>{infoCard.text}</i></Typography>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard article={articles} i={index} activeArticles={activeArticles} />
          </Grid>
        ))}
      </Grid>

    </Grow>
  )
}

export default NewsCards;
