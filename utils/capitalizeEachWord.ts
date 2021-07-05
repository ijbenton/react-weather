const capitalizeEachWord = (sentence: string) => {
  const wordArray = sentence.split(' ');
  const capitalizedWordArray = wordArray.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  });
  const capitalizedSentence = capitalizedWordArray.join(' ');

  return capitalizedSentence;
};

export default capitalizeEachWord;
