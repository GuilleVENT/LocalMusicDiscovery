
function chooseId(){
  track_ids = ['1w5sLDYzYAGI0AkLc6FPlO',
  '4efoEY8iDBzUqitjmNDhpN',
  '61dXuN3VyqGOyOeMfJXIPh',
  '1QQfbfMfyzNZhT5fg3RpuS',
  '58qEQujDJy5ma0cWRnB6dh',
  '14CsUVcoKztExH6aSgfrfb',
  '4OsZ1vrenrtSbqLJxOceKl',
  '4xT2AOtQPjtyQgPmnygsx4',
  '2mKsPUojh602HvSeNt04CB',
  '21dOjdraFZffs2lnQObaiZ']
  return(track_ids[3])
}

function changeSong() {
    document.getElementById('myIframe').src = "https://embed.spotify.com/?uri=spotify:track:" + chooseId();
}
