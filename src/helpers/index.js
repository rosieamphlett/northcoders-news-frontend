function chooseImg(topic) {
    if (topic === 'coding') {
        return "https://cdn-images-1.medium.com/max/1600/1*8r6hvv5E-FOOdKOih4G7Hg.jpeg"
    } else if(topic === 'cooking') {
      return "https://usateatsiptrip.files.wordpress.com/2018/03/gettyimages-887636042.jpg?w=1000&h=600&crop=1"
    } else if(topic === 'football') {
      return "https://nevadapreps.com/wp-content/uploads/2017/08/9048804_web1_bcr-soccer-aug04-16.jpg"
    } else {
      return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
    }
}

export default chooseImg;