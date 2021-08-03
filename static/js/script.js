window.onload =authenticate
if(sh<750)
{
    vp_1 = document.querySelectorAll('.without-size')
    vp_1.forEach((ele)=>
    {
        ele.style.height=`${(sh*0.72)}px`
    })
    vp_2 = document.querySelectorAll('.with-size')
    vp_2.forEach((e)=>
    {
        e.style.height=`${(sh*0.45)}px`
    })
}
refresh_id = document.querySelector("#refresh_id")
refresh_id.addEventListener('click',()=>
{
   location.href="https://www.youtube.com/channel/UCoXQDML17ann6UjNHxXYXQw"
})
function openNav() {
    document.querySelector("#mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
cpd = document.getElementById('change_player_data')
cpd.addEventListener('click',()=>
{
    sd = get_sd_value(0)
    fp = document.getElementById('first_panel')
    fp.style.display="none"
    generate_random_series_results()
})
// handling side bar
sb = document.querySelectorAll('#side_bar')
sb.forEach((ele,index)=>
{
    ele.addEventListener('click',()=>
    {
        if(index==0)
        {
            location.reload()
        }
        else if(index==1)
        {
            closeAll()
            req = document.querySelector('#how_to_generate')
            req.style.display="block"
            closeNav()
        }
        else if(index==2)
        {
            closeAll()
            req = document.querySelector('#best_tips')
            req.style.display="block"
            closeNav()
        }
        else if(index==3)
        {
            closeAll()
            req = document.querySelector('#contact_us')
            req.style.display="block"
            closeNav()
        }
        else if(index==4)
        {
            location.href="https://www.youtube.com/channel/UCoXQDML17ann6UjNHxXYXQw"
        }
        else{
            closeAll()
            req = document.querySelector('#about_us')
            req.style.display="block"
            closeNav()
        }
    })
})
let closeAll = function()
{
    list = document.querySelectorAll('.jp')
    list.forEach((obj,index)=>
    {
        obj.style.display="none"
    })
}


sp_new = document.querySelector('#sport_panel')
sport_cric = document.querySelector('#sport_cricket')
sport_foot = document.querySelector('#sport_football')
sport_basket = document.querySelector('#sport_basketball')
sport_kabaddi = document.querySelector('#sport_kabaddi')
sport_cric.addEventListener('click',()=>
{
    sp_new.style.display="none"
    fp = document.querySelector('#first_panel')
    fp.style.display="block"

  //---
  mr= document.getElementById('match_result')
  mr.addEventListener('click',()=>
  {
        sd = get_sd_value(0)
        sport_type(0,-1)
      fp = document.getElementById('first_panel')
      fp.style.display="none"
      generate_match_result_series(0)
  })
  //-----
    choose_type = document.querySelector('#choose_type')
    choose_type.addEventListener('click',()=>
    {
        SuccessMsg('Always Check player credits and role before generating!')
        sd = get_sd_value(0)
        sport_type(0,-1)
        console.log(sd)
        fp= document.getElementById('first_panel')
        fp.style.display="none"
        //-------
        fantasy_p = document.querySelector('#fantasy_panel')
        fantasy_p.style.display="block"
        fl = document.querySelectorAll('#fantasy_logo')
            fl.forEach((obj)=>
            {
                obj.addEventListener('click',()=>
                {
                    fl.forEach((v_obj)=>
                    {
                        v_obj.classList.remove('border-grey')
                    })
                    obj.classList.add('border-grey')
                })
            })
        fantasy_c = document.querySelector('#fantasy_continue')
        fantasy_c.addEventListener('click',()=>
        {
            fantasy_logo = document.querySelectorAll('#fantasy_logo')
            fantasy_logo.forEach((obj,index)=>
            {
                if(Array.from(obj.classList).includes('border-grey'))
                {
                    fantasy_p.style.display="none"
                    generate_random_series(0,index)
                }
            })
        })
        //------
    })
  //----
  cm = document.querySelector('#custom_match')
  cm.addEventListener('click',()=>
  {
      fp = document.querySelector('#first_panel')
      fp.style.display="none"
      SuccessMsg('Always Check player credits and role before generating!')
      sfp = document.querySelector('#secondary_first_panel')
      sfp.style.display = "block"
      sd = get_sd_value(3)
      sport_type(3,-1)
  })
})
sport_foot.addEventListener('click',()=>
{
    sp_new.style.display="none"
    fp = document.querySelector('#secondary_first_panel')
    fp.style.display="block"
    SuccessMsg('Always Check player credits and role before generating!')
    sd=get_sd_value(1)
    sport_type(1,-1)
})
sport_basket.addEventListener('click',()=>
{
    sp_new.style.display="none"
    fp = document.querySelector('#secondary_first_panel')
    fp.style.display="block"
    SuccessMsg('Always Check player credits and role before generating!')
    sd= get_sd_value(2)
    sport_type(2,-1)
//     raiseError('Currently Basketball is still under developement!')
//     return;
})
sport_kabaddi.addEventListener('click',()=>
{
    sp_new.style.display="none"
    fp = document.querySelector('#secondary_first_panel')
    fp.style.display="block"
    SuccessMsg('Always Check player credits and role before generating!')
    sd=get_sd_value(4)
    sport_type(4,-1)
})




let match_number_control = function(team1,team2,series_index,mode,sport_id,fantasy)
{
    mnc= document.getElementById('match_number_continue')
    mnc.addEventListener('click',()=>
    {
        mnv = document.getElementById('match_number_value')
        mnv_value = mnv.value
        if(mnv_value==null) {raiseError('Invalid Input');return}
        mn = document.getElementById('match_number')
        mn.style.display="none"
        cp = document.getElementById('choose_player')
        cp.style.display="block"
        GeneratePlayers(team1,team2,Number(mnv_value),series_index,mode,sport_id,fantasy)
    })
}
let GeneratePlayers = function(team1,team2,mn,series_index,mode,sport_id,fantasy)
{ 
    if(team1>team2)
    {
        let temp = team1
        team1= team2
        team2= temp
    }
    
    teams_json = sd.req_data[series_index]
    team1_data = teams_json.teams[team1]
    team2_data = teams_json.teams[team2]
    displayTeams(team1_data,team2_data,team1,team2,mn,series_index,mode,sport_id,fantasy)
}
home = document.getElementById('home_id')
home.addEventListener('click',()=>
{
    location.reload()
})
let displayTeams = function(team1_data,team2_data,team1,team2,mn,series_index,mode,sport_id,fantasy)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
    role_value = all_value[sport_id]
    let team_list=sd.req_data[series_index].teams_list
    team_one = document.getElementById('team_one')
    team_two = document.getElementById('team_two')
    team_one_head = document.getElementById('team_one_head')
    team_two_head = document.getElementById('team_two_head')
    span_one = document.createElement('span')
    span_two = document.createElement('span')
    span_one.classList.add('span_one_index')
    span_one.classList.add('span_two_index')
    span_one.textContent=team1
    span_two.textContent=team2
    span_one.style.display="none"
    span_two.style.display="none"
    if(sport_id==0)
    {
    team_one_img = document.createElement('img')
    team_two_img = document.createElement('img')
    team_one_img.src = 'dream11_images/'+team_list[team1]+".jpg"
    team_two_img.src = 'dream11_images/'+team_list[team2]+".jpg"
    team_one_img.classList.add('team-image')
    team_two_img.classList.add('team-image')
    team_one_head.appendChild(team_one_img)
    team_one_head.appendChild(span_one)
    team_two_head.appendChild(team_two_img)
    team_two_head.appendChild(span_one)
    }
    else{
        team_one_img = document.createElement('div')
        team_two_img = document.createElement('div')
        h6_one = document.createElement('h6')
        h6_two = document.createElement('h6')
        h6_one.style.paddingTop="5px"
        h6_two.style.paddingTop="5px"
        h6_one.textContent=team1_data.team_name
        h6_two.textContent=team2_data.team_name
        team_one_img.appendChild(h6_one)
        team_two_img.appendChild(h6_two)
        team_one_img.style.border="1px solid black"
        team_two_img.style.border="1px solid black"
        team_one_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        team_two_img.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        team_one_head.appendChild(team_one_img)
        team_one_head.appendChild(span_one)
        team_two_head.appendChild(team_two_img)
        team_two_head.appendChild(span_one)
    }
    

    
    team1_data.players.forEach((player)=>
    {
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.textContent=player.player_name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role_value[player.player_role]
        span_credits = document.createElement('span')
        span_credits.textContent=player.player_credits
        inner_div2.classList.add('d-flex','justify-content-between')
        inner_div2.appendChild(span_role)
        inner_div2.appendChild(span_credits)
        inner_div1.appendChild(span_name)
        inner_div1.appendChild(inner_div2)
        inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
        var img = document.createElement('img');
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        outer_div.appendChild(img)
        outer_div.appendChild(inner_div1)
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','team_one_data')
        team_one.appendChild(outer_div)
    })
    team2_data.players.forEach((player)=>
    {
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.textContent=player.player_name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role_value[player.player_role]
        span_credits = document.createElement('span')
        span_credits.textContent=player.player_credits
        inner_div2.classList.add('d-flex','justify-content-between')
        inner_div2.appendChild(span_role)
        inner_div2.appendChild(span_credits)
        inner_div1.appendChild(span_name)
        inner_div1.appendChild(inner_div2)
        inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
        var img = document.createElement('img');
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        outer_div.appendChild(img)
        outer_div.appendChild(inner_div1)
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','team_two_data')
        team_two.appendChild(outer_div)
    })
select_players(team1,team2,mn,series_index,mode,sport_id,fantasy)
}

