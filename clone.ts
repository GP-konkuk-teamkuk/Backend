import axios from 'axios';
import cheerio from 'cheerio';
import { saveBookDetails } from './repo/repo';

const crawlBooks = async () => {
  try {
    const { data } = await axios.get('https://example.com/books'); // Replace with the actual URL
    const $ = cheerio.load(data);

    $('.book-item').each(async (index, element) => {
      const title = $(element).find('.book-title').text();
      const author = $(element).find('.book-author').text();
      const publishedDate = $(element).find('.book-published-date').text();
      const description = $(element).find('.book-description').text();

      await saveBookDetails(title, author, publishedDate, description);
    });

    console.log('Books have been successfully crawled and saved to the database.');
  } catch (error) {
    console.error('Error while crawling books:', error.message);
  }
};

crawlBooks();
