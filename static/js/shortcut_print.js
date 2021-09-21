short_p = document.querySelector('#shortcut_print')
short_p.addEventListener('click',()=>
{
    mn = Number(document.querySelector('#span_mn').textContent)
    attempt_id = Number(document.querySelector('#span_attempt_id').textContent)
    series_index = Number(document.querySelector('#span_series_index').textContent)
    sport_id = Number(document.querySelector('#span_sport_id').textContent)
    display_shortcut_teams(mn,attempt_id,series_index,sport_id)
})
let display_shortcut_teams = function(mn,attempt_id,series_index,sport_id)
{
    console.log(mn,attempt_id,series_index)
    let data = JSON.parse(localStorage.getItem(`WA_${sport_id}_${series_index}_${sd.req_data[series_index].code}_${mn}`))
    data.attempts.forEach((attempt)=>
    {
        if(attempt.team_list_id==attempt_id)
        {
            display_shortcut_teams_helper(attempt,series_index,sport_id);
        }
    })

}
let display_shortcut_teams_helper = function(attempt,series_index,sport_id)
{
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[attempt.team_one_index].players
    team2 = teams_data_obj.teams[attempt.team_two_index].players
    teams_shortcut = document.querySelector('#teams_shortcut')
    teams_shortcut.style.display="block"
    tv = document.querySelector('#teams_vp')
    tv.style.display="none"
    tsp = document.querySelector('#team_shortcut_placer')
    attempt.team_list.forEach((team,index)=>
    {
        selected_players =[]
        team.selected_team_one.forEach((sto_index)=>
        {
            selected_players.push(team1[sto_index])
        })
        team.selected_team_two.forEach((stt_index)=>
        {
            selected_players.push(team2[stt_index])
        })
        tsp.appendChild(get_shortcut_team(selected_players,index+1,team.captain,team.vice_captain,sport_id))
    })
}
let get_shortcut_team = function(selected_players,team_number,captain,vice_captain,sport_id)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
    role_value = all_value[sport_id]
    all_special=[
        ['c','vc'],['c','vc'],['sp','pp'],['c','vc'],['c','vc']
    ]
    req_special=all_special[sport_id]
    div = document.createElement('div')
    div.classList.add('border','shortcut-team','m-2')
    li=document.createElement('li')
    li.textContent=`Team no: ${team_number}`
    div.appendChild(li)
    wk=[]
    bat=[]
    al=[]
    bowl=[]
    one_arr=[]
    for(let i=0;i<role_value.length;i++)
        one_arr.push([])
    selected_players.forEach((p)=>
    {
        one_arr[p.player_role].push(p)
    })
    
    for(let i=1;i<role_value.length;i++)
    {
        v_1 = document.createElement('span')
        v_1.textContent=role_value[i]
        v_1.style.color="green"
        div.appendChild(v_1)
        one_arr[i].forEach((player)=>
        {
            temp = document.createElement('li')
            if(player.player_id==captain)
            temp.textContent=`${player.player_name}(${req_special[0]})`
            else if(player.player_id==vice_captain)
            temp.textContent=`${player.player_name}(${req_special[1]})`
            else
            temp.textContent=`${player.player_name}`
            div.appendChild(temp)
        })
    }  
    return div
}
