let display_teams = function(mn,attempt_index,toi,tti,series_index,attempt_id,sport_id)
{
    let temp = localStorage.getItem(`WA_${sport_id}_${series_index}_${sd.req_data[series_index].code}_${mn}`)
    if(temp==null)
    {
        raiseError('No Match Found with given match number!')
        fp = document.getElementById('first_panel')
        if(fp!=null)
        fp.style.display="block"
    }
    tv= document.getElementById('teams_vp')
    tv.style.display="block"
    vp_footer = document.querySelector('#footer_vp')
    vp_footer.style.visibility='hidden'
    obj = JSON.parse(temp)
    obj.attempts.forEach((attempt,index)=>
    {
       if(index == attempt_index)
       {
           display_teams_helper(attempt.team_list,toi,tti,series_index,mn,attempt_id,sport_id)
       }
    })
}
let display_teams_helper = function(team_list,toi,tti,series_index,mn,attempt_id,sport_id)
{
    team_placer = document.getElementById('team_placer')
    //-----------------------
    span_mn = document.createElement('span')
    span_mn.textContent=mn
    span_mn.setAttribute('id','span_mn')
    span_mn.style.display="none"
    //---
    span_attempt_id = document.createElement('span')
    span_attempt_id.textContent=attempt_id
    span_attempt_id.setAttribute('id','span_attempt_id')
    span_attempt_id.style.display="none"
    //---
    span_series_index = document.createElement('span')
    span_series_index.textContent=series_index
    span_series_index.setAttribute('id','span_series_index')
    span_series_index.style.display="none"

    //---
    span_sport_id = document.createElement('span')
    span_sport_id.textContent=sport_id
    span_sport_id.setAttribute('id','span_sport_id')
    span_sport_id.style.display="none"
    //------------------------
    team_placer.appendChild(span_mn)
    team_placer.appendChild(span_attempt_id)
    team_placer.appendChild(span_series_index)
    team_placer.appendChild(span_sport_id)
    team_list.forEach((team)=>
    {
        created_team = get_11_memebers(team,toi,tti,series_index,sport_id)
        team_placer.appendChild(created_team)
    })
}
let get_11_memebers = function(team,toi,tti,series_index,sport_id)
{ 
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
    role_value = all_value[sport_id]
    //----
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[team.team_one_index].players
    team2 = teams_data_obj.teams[team.team_two_index].players
    selected_players =[]
    team.selected_team_one.forEach((sto_index)=>
    {
        selected_players.push(team1[sto_index])
    })
    team.selected_team_two.forEach((stt_index)=>
    {
        selected_players.push(team2[stt_index])
    })
    //console.log(selected_players)
    wk=[]
    bat=[]
    al=[]
    bowl=[]
    one_arr=[]
    for(let i=0;i<role_value.length;i++)
        one_arr.push([])
    
   
    selected_players.forEach((player)=>
    {
        one_arr[player.player_role].push(player)
    })
    return final_team_creation(one_arr,team.captain,team.vice_captain,team.team_number,team.team_credits,0,toi,tti,sport_id,[])
}

let final_team_creation = function(one_arr,captain,vice_captain,team_number,credits,vp,toi,tti,sport_id,one_score_arr)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]

    all_special=[
        ['c','vc'],['c','vc'],['sp','pp'],['c','vc'],['c','vc']
    ]
    p_credits = 0
    one_arr.forEach((arr)=>
    {
        arr.forEach((player)=>
        {
            p_credits+=player.player_credits
        })
    })
    req_special=all_special[sport_id]
    role_value = all_value[sport_id]
    final_outer_div = document.createElement('div')
    final_outer_div.classList.add('d-flex','flex-column','justify-content-start')
    inner_outer_div = document.createElement('div')
    inner_outer_div.classList.add('d-flex','mt-2','justify-content-between','align-items-center')
    span_team_number =document.createElement('h6')
    span_team_credits =document.createElement('h6')
    span_team_points =document.createElement('h6')
    span_team_number.textContent=`Team No : ${team_number}`
    inner_outer_div.appendChild(span_team_number)
    if(vp==0){
    span_team_credits.textContent=`Credits : ${credits}`
    inner_outer_div.appendChild(span_team_credits)
    }
    else 
    {
    span_team_credits.textContent=`Credits : ${p_credits}`
    span_team_points.textContent=`Points : ${credits}`
    inner_outer_div.appendChild(span_team_credits)
    inner_outer_div.appendChild(span_team_points)
    }
    outer_div = document.createElement('div')
    outer_div.classList.add('mb-4','cricket-bg-style','d-flex','flex-column','justify-content-around')
    if(sport_id==0 || sport_id == 3)
        outer_div.style.backgroundImage="url('dream11_images/ground.jpg')"
    else if(sport_id==1)
        outer_div.style.backgroundImage="url('dream11_images/f_ground.jpg')"
    else if(sport_id == 2)
        outer_div.style.backgroundImage="url('dream11_images/b_ground.jpg')"
    else
        outer_div.style.backgroundImage="url('dream11_images/k_ground.jpg')"
    

    for(let i=1;i<role_value.length;i++)
    {
        p_div=document.createElement('div')
        p_div.classList.add('mt-2','d-flex','layout-style','justify-content-around','flex-wrap','align-items-center')
        one_arr[i].forEach((player,j)=>
        {
            p_sub_div = document.createElement('div')
            p_sub_div.classList.add('text-center','d-flex','flex-column','justify-content-center','align-items-center')
            p_sub_div.style.position="relative"
            if(player.player_id==captain)
            {
                span_ele = document.createElement('span')
                span_ele.classList.add('captain')
                span_ele.textContent=req_special[0]
                p_sub_div.appendChild(span_ele)
            }
            else if(player.player_id==vice_captain)
            {
                span_ele = document.createElement('span')
                span_ele.classList.add('vice-captain')
                span_ele.textContent=req_special[1]
                p_sub_div.appendChild(span_ele)
            }
            p_img = document.createElement('img')
            //var image_flag = sd.req_data[series_index].image_present
            var kp = ''+player.player_image
            if(kp.length>8)
            p_img.src = player.player_image;
            else 
            p_img.src = 'player_images/'+player.player_image+'.jpg';
            p_img.classList.add('player-image')
            p_sub_div.appendChild(p_img)
            p_p = document.createElement('span')
            p_p_c = document.createElement('span')
            p_p_c.style.fontSize="12px"
            p_p_c.style.fontWeight="bold"
            p_p_c.style.color="white"
            if(vp==0)
            p_p_c.textContent=`${player.player_credits} Cr`
            else
            p_p_c.textContent=`${one_score_arr[i][j]} PTS`
            p_p.textContent = get_name(player.player_name)
            if(player.player_team_index==toi)
            p_p.classList.add('player-name-black')
            else
            p_p.classList.add('player-name')
            p_sub_div.appendChild(p_p)
            p_sub_div.appendChild(p_p_c)
            p_div.appendChild(p_sub_div)
        })
        outer_div.appendChild(p_div)
    }
    final_outer_div.appendChild(inner_outer_div)
    final_outer_div.appendChild(outer_div)
    return final_outer_div
}

