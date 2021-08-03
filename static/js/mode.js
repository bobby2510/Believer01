let mode_method = function(team1,team2,mn,index_one,index_two,series_index,mode,sport_id,fantasy)
{
    console.log(fantasy)
    let team_one = sd.req_data[series_index].teams[team1].players
    let team_two = sd.req_data[series_index].teams[team2].players
    let selected_team_one=[]
    let selected_team_two=[]
    index_one.forEach((index)=>
    {
        selected_team_one.push(team_one[index])
    })
    index_two.forEach((index)=>
    {
        selected_team_two.push(team_two[index])
    })
    c_one_index=[]
    c_two_index=[]
    vc_one_index=[]
    vc_two_index=[]
    selected_team_one.forEach((player)=>
    {
        if(player.player_credits>=9)
        {
            c_one_index.push(player.player_index)
            vc_one_index.push(player.player_index)
        }
    })
    selected_team_two.forEach((player)=>
    {
        if(player.player_credits>=9)
        {
            c_two_index.push(player.player_index)
            vc_two_index.push(player.player_index)
        }
    })

    all_tsd=[
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2],
        [0,1,2,3],
        [0,1,2,3]
    ]
    selected_tsd=all_tsd[sport_id]
    if(mode==0)
    {
        team_generator(index_one,index_two,team1,team2,mn,98,100,[],[],c_one_index,c_two_index,vc_one_index,vc_two_index,selected_tsd,series_index,mode,sport_id,fantasy)
    }
    else{
        team_generator(index_one,index_two,team1,team2,mn,97,100,[],[],c_one_index,c_two_index,vc_one_index,vc_two_index,selected_tsd,series_index,mode,sport_id,fantasy)
    }
}
