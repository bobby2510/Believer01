// sport_id => cricket - 0, football - 1, basketball - 2, kabaddi - 4, MYCRICKET - 3.
let sport_type = function(sport_id,fantasy)
{
    
    scs = document.querySelector('#secondary_create_series')
    escs = document.querySelector('#empty_secondary_create_series')
    ses = document.querySelector('#secondary_edit_series')
    scs.addEventListener('click',()=>
    {
        sfp = document.querySelector('#secondary_first_panel')
        sfp.style.display="none"
        csp = document.querySelector('#create_series_panel')
        csp.style.display="block"
        secondary_create_series(sport_id,-1)
    })
    escs.addEventListener('click',()=>
    {
        
        sfp = document.querySelector('#choose_series')
        sfp.style.display="none"
        csp = document.querySelector('#create_series_panel')
        csp.style.display="block"
        secondary_create_series(sport_id,-1)
    })
    ses.addEventListener('click', ()=>
    {
        sfp = document.querySelector('#secondary_first_panel')
        sfp.style.display="none"
        ses = document.querySelector('#secondary_edit_series_panel')
        ses.style.display="block"
        secondary_edit_series(sport_id)
    })
    //--------------------
    //---------------------
    
    secondary_choose_type = document.querySelector('#secondary_choose_type')
    secondary_choose_type.addEventListener('click',()=>
    {
        console.log(sd)
        fp= document.getElementById('secondary_first_panel')
        fp.style.display="none"
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
                    generate_random_series(sport_id,index)
                }
            })
        })
    })
    secondary_mr= document.getElementById('secondary_match_result')
    secondary_mr.addEventListener('click',()=>
    {
        fp = document.getElementById('secondary_first_panel')
        fp.style.display="none"
        generate_match_result_series(sport_id)
    })

}
let secondary_create_series = function(sport_id,flag) 
{
    if(flag==-1)
    {
    csi = document.querySelector('#create_series_input')
    csi.style.display="block"
    csc = document.querySelector('#create_series_continue')
    //console.log(c_series_name,c_series_code)
    csc.addEventListener('click',()=>
    {
        c_series_name = document.querySelector('#c_series_name').value
        c_series_code = document.querySelector('#c_series_code').value
        if(c_series_name == null || c_series_code==null)
        {
            raiseError('Invalid Input!')
            return;
        }
        if(c_series_code.length < 2 || c_series_code.length> 4)
        {
            console.log(c_series_code)
            raiseError('Series code should of length 2-4 characters only!')
            return
        }
        if(sport_id==1)
        {
            data = JSON.parse(localStorage.getItem('football'))
            data.req_data.push(new Series(c_series_code,c_series_name,[],[],0))
            localStorage.setItem('football',JSON.stringify(data))
            SuccessMsg('Series Created Successfully!')
        }
        else if(sport_id == 2)
        {
            data = JSON.parse(localStorage.getItem('basketball'))
            data.req_data.push(new Series(c_series_code,c_series_name,[],[],0))
            localStorage.setItem('basketball',JSON.stringify(data))
            SuccessMsg('Series Created Successfully!')
        }
        else if(sport_id == 3)
        {
            data = JSON.parse(localStorage.getItem('mycricket'))
            data.req_data.push(new Series(c_series_code,c_series_name,[],[],0))
            localStorage.setItem('mycricket',JSON.stringify(data))
            SuccessMsg('Series Created Successfully!')
        }
        else 
        {
            data = JSON.parse(localStorage.getItem('kabaddi'))
            data.req_data.push(new Series(c_series_code,c_series_name,[],[],0))
            localStorage.setItem('kabaddi',JSON.stringify(data))
            SuccessMsg('Series Created Successfully!')
        }
        csi.style.display="none"
        helper(sport_id,data.req_data.length-1)
    })
    }
    else{
        helper(sport_id,flag)
    }
}

let helper = function(sport_id,series_index)
{
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']
    ]
    role_value = all_value[sport_id]
    data = null
    if(sport_id==1)
    {
        data = JSON.parse(localStorage.getItem('football'))
    }
    else if(sport_id == 2) {
        data = JSON.parse(localStorage.getItem('basketball'))
    }
    else if(sport_id == 3)
        data = JSON.parse(localStorage.getItem('mycricket'))
    else
        data = JSON.parse(localStorage.getItem('kabaddi'))
    //------
    sd = document.querySelector('#series_details')
        sd.style.display="block"
        series_n = document.querySelector('#series_n')
        series_n.textContent=`Series Name : ${data.req_data[series_index].name}`
        ct = document.querySelector('#current_teams')
        if(data.req_data[series_index].teams_list==0)
        {
            span_t = document.createElement('span')
            span_t.textContent="Currently no teams are in this Series!"
            ct.appendChild(span_t)
        }
        else{
            data.req_data[series_index].teams_list.forEach((t_name)=>
            {
                span_team = document.createElement('span')
                span_team.classList.add('border-grey','m-2')
                span_team.textContent=t_name
                ct.appendChild(span_team)
            })
        }
        add_team = document.querySelector('#add_team')
        add_team.addEventListener('click',()=>
        {
            csp = document.querySelector('#create_series_panel')
            csp.style.display="none"
            helper_two(sport_id,series_index,-1)
           
        })
        edit_teams = document.querySelector('#edit_teams')
        edit_teams.addEventListener('click',()=>
        {
            csi = document.querySelector('#create_series_panel')
            csi.style.display="none"
            edit_teams_data = document.querySelector('#edit_teams_data_panel')
            edit_teams_data.style.display="block"
            etd_placer = document.querySelector('#edit_teams_data_placer')
            //console.log(data.req_data[series_index].teams_list)
            data.req_data[series_index].teams_list.forEach((team_name,index)=>
            {
                if(data.req_data[series_index].data_type==1)
                {
                    img = document.createElement('img')
                    
                    let new_flag = data.req_data[series_index].image_present
                    if(new_flag !=undefined && new_flag == 1){
                        img.src = data.req_data[series_index].team_image_list[index]
                       
                    }
                    else{
                        img.src="dream11_images/"+team_name+".jpg"
                    }

                    
                    v_span = document.createElement('span')
                    v_span.textContent = team_name
                    img.classList.add('team-image')
                        my_div = document.createElement('div')
                  //  my_div.classList.add('d-flex','flex-column','justify-content-center','align-items-center')
                        my_div.appendChild(img)
                        my_div.appendChild(v_span)
                        my_div.setAttribute('id','series_logo')
                    etd_placer.appendChild(my_div)
                }
                else {
                v_div = document.createElement('div')
                h6 = document.createElement('h6')
                h6.style.paddingTop="5px"
                h6.textContent=team_name
                v_div.appendChild(h6)
                v_div.style.border="1px solid black"
                v_div.style.backgroundColor="#F5F5F5"
                v_div.classList.add('team-image','d-flex','justify-content-center','align-items-center')
                v_div.setAttribute('id','series_logo')
                etd_placer.appendChild(v_div)
                }
            })
            sl = etd_placer.querySelectorAll('#series_logo')
            sl.forEach((ele,index)=>
            {
                ele.addEventListener('click',()=>
                 {
                    sl.forEach((temp)=>
                    {
                        temp.classList.remove('border-grey')
                    })
                    ele.classList.add('border-grey')
                })
            })
        
            sesc = document.querySelector('#edit_teams_data_continue')
            sesc.addEventListener('click',()=>
            {
                let team_index=-1
              //  console.log(sl.length)
                sl.forEach((temp,index)=>
                {
                   if(Array.from(temp.classList).includes('border-grey'))
                    team_index=index 
                })
                if(team_index!=-1)
                {
                    sesp = document.querySelector('#edit_teams_data_panel')
                    sesp.style.display="none"
                   // console.log(team_index)
                    helper_two(sport_id,series_index,team_index)
                   
                }
                else{
                    raiseError('Should select the Team')
                    return
                }
            })
        })
        remove_series = document.querySelector('#remove_series')
        remove_series.addEventListener('click',()=>
        {
            current_data = data.req_data
            current_data.splice(series_index,1)
            data.req_data=current_data
            if(sport_id==1)
                localStorage.setItem('football',JSON.stringify(data))
            else if(sport_id == 2)
                localStorage.setItem('basketball',JSON.stringify(data))
            else if(sport_id == 3)
                localStorage.setItem('mycricket',JSON.stringify(data))
            else 
                localStorage.setItem('kabaddi',JSON.stringify(data))

            location.reload()
        })
}

let helper_two = function(sport_id,series_index,vp_dp)
{
    ctp = document.querySelector('#create_team_panel')
    ctp.style.display="block"
    if(vp_dp==-1)
    {
    cti = document.querySelector('#create_team_input')
    cti.style.display="block"
    ct_continue = document.querySelector('#create_team_continue')
    ct_continue.addEventListener('click',()=>
    {

        tn = document.querySelector('#team_name').value
        if(tn==null){
            raiseError('Invalid Input!')
            return
        }
        if(tn.length<2 || tn.length>4)
        {
            raiseError('Team name length should be around 2-4 characters!')
            return
        }
        cti.style.display="none"
        data.req_data[series_index].teams_list.push(tn)
        data.req_data[series_index].teams.push(new Team([],tn))
        team_index=0
        temp_index = data.req_data[series_index].teams_list.length
        if(temp_index!=0)
        team_index=temp_index-1
        //-----
        if(sport_id==1)
        localStorage.setItem('football',JSON.stringify(data))
        else if(sport_id == 2)
        localStorage.setItem('basketball',JSON.stringify(data))
        else if(sport_id == 3)
        localStorage.setItem('mycricket',JSON.stringify(data))
        else
        localStorage.setItem('kabaddi',JSON.stringify(data))

    SuccessMsg('Team Created Successfully!')
        helper_three(sport_id,series_index,team_index)
    })
    }
    else{
        helper_three(sport_id,series_index,vp_dp)
    }
}

let helper_three = function(sport_id,series_index,team_index)
{
        data = null
        console.log(sport_id)
        if(sport_id==1)
        {
            data = JSON.parse(localStorage.getItem('football'))
        }
        else if(sport_id == 2) {
            data = JSON.parse(localStorage.getItem('basketball'))
        }
        else if(sport_id == 3)
            data = JSON.parse(localStorage.getItem('mycricket'))
        else 
            data = JSON.parse(localStorage.getItem('kabaddi'))

        tm = document.querySelector('#team_details')
        tm.style.display="block"
        edit_vp_player = document.querySelector('#edit_vp_player')
        remove_vp_player = document.querySelector('#remove_vp_player')
        remove_vp_team = document.querySelector('#remove_vp_team')
        edit_vp_player.addEventListener('click',()=>
        {
            c_team_p = document.querySelector('#create_team_panel')
            c_team_p.style.display="none"
            edit_player_data(sport_id,series_index,team_index)
        })
        remove_vp_player.addEventListener('click',()=>
        {
            c_team_p = document.querySelector('#create_team_panel')
            c_team_p.style.display="none"
            remove_player_data(sport_id,series_index,team_index)
        })
        remove_vp_team.addEventListener('click',()=>
        {
            curr_one=data.req_data[series_index].teams
            curr_two = data.req_data[series_index].teams_list
            curr_one.splice(team_index,1)
            curr_two.splice(team_index,1)
            data.req_data[series_index].teams=curr_one
            data.req_data[series_index].teams_list= curr_two
            if(sport_id==1)
            localStorage.setItem('football',JSON.stringify(data))
            else if(sport_id == 2)
            localStorage.setItem('basketball',JSON.stringify(data))
            else if(sport_id == 3)
            localStorage.setItem('mycricket',JSON.stringify(data))
            else 
            localStorage.setItem('kabaddi',JSON.stringify(data))

            location.reload()
        })
        team_n = document.querySelector('#team_n')
        team_n.textContent=`Team Name : ${data.req_data[series_index].teams_list[team_index]}`
        
        player_r = document.querySelector('#player_r')
        for(let i=1;i<role_value.length;i++)
            {
                c_o = document.createElement('option')
                c_o.value=i
                c_o.textContent=role_value[i]
                player_r.appendChild(c_o)
            }
        ap = document.querySelector('#add_player')
        ap.addEventListener('click',()=>
        {
            apd = document.querySelector('#add_player_data')
            apd.style.display="block"
        })
        ep = document.querySelector('#existing_players')
        if(data.req_data[series_index].teams[team_index].players.length==0)
        {
            temp_ele = document.createElement('h6')
            temp_ele.textContent="Currentely no player is stored!"
            ep.appendChild(temp_ele)
        }
        previous_p_cnt = data.req_data[series_index].teams[team_index].players.length
        data.req_data[series_index].teams[team_index].players.forEach((player)=>
        {
            outer_div = document.createElement('div')
            inner_div1 = document.createElement('div')
            inner_div2 = document.createElement('div')
            span_name = document.createElement('span')
            span_name.setAttribute('id','player_name')
            span_name.textContent=player.player_name
            span_role = document.createElement('span')
            span_role.setAttribute('id','player_role')
            span_role.textContent=role_value[player.player_role]
            span_credits = document.createElement('span')
            span_credits.setAttribute('id','player_credits')
            span_credits.textContent=player.player_credits
            inner_div2.classList.add('d-flex','justify-content-between')
            inner_div2.appendChild(span_role)
            inner_div2.appendChild(span_credits)
            inner_div1.appendChild(span_name)
            inner_div1.appendChild(inner_div2)
            inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
            var img = document.createElement('img');
            img.src = 'player_images/0.jpg';
            img.classList.add('selected-player-image')
            outer_div.appendChild(img)
            outer_div.appendChild(inner_div1)
            outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey')
            ep.appendChild(outer_div)
        })
        main_add = document.querySelector('#main_add')
        main_add.addEventListener('click',()=>
        {
            player_n = document.querySelector('#player_n')
            player_c = document.querySelector('#player_c')
            player_r = document.querySelector('#player_r')
  
            if(player_n.value== null || player_n.value.length< 3)
            {
                raiseError('Invalid Player name!')
                return
            }
            if(player_c.value == null || player_c.value=='' ||  parseFloat(player_c.value)<0)
            {
                raiseError('Invalid player credits!')
                return
            }
            
            pp = document.querySelector('#p_placer')
            outer_div = document.createElement('div')
            inner_div1 = document.createElement('div')
            inner_div2 = document.createElement('div')
            span_name = document.createElement('span')
            span_name.setAttribute('id','player_name_jp')
            span_name.textContent=player_n.value
            span_role = document.createElement('span')
            span_role.setAttribute('id','player_role_jp')
            span_role.textContent=role_value[player_r.value]
            span_credits = document.createElement('span')
            span_credits.setAttribute('id','player_credits_jp')
            span_credits.textContent=player_c.value
            inner_div2.classList.add('d-flex','justify-content-between')
            inner_div2.appendChild(span_role)
            inner_div2.appendChild(span_credits)
            inner_div1.appendChild(span_name)
            inner_div1.appendChild(inner_div2)
            inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
            var img = document.createElement('img');
            img.src = 'player_images/0.jpg';
            img.classList.add('selected-player-image')
            outer_div.appendChild(img)
            outer_div.appendChild(inner_div1)
            outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','adding_data')
            pp.appendChild(outer_div)
            player_n.value=''
            player_c.value=''
            apd = document.querySelector('#add_player_data')
            apd.style.display="none"
            })
            apc = document.querySelector('#add_player_continue')
            apc.addEventListener('click',()=>
            {
                p_name=[]
                p_role=[]
                p_credits=[]
                all_ad = document.querySelectorAll('.adding_data')
                console.log(all_ad.length)
                all_ad.forEach((obj)=>
                {
                    p_name.push(obj.querySelector('#player_name_jp').textContent)
                    p_role.push(role_value.indexOf(obj.querySelector('#player_role_jp').textContent))
                    p_credits.push(parseFloat(obj.querySelector('#player_credits_jp').textContent))
                })
                let cnt = parseInt(localStorage.getItem('counter'))
                console.log(p_name.length)
                for(let i=0;i<p_name.length;i++)
                {
                    data.req_data[series_index].teams[team_index].players.push(new Player(p_name[i],p_role[i],p_credits[i],0,previous_p_cnt,team_index,cnt))
                    cnt++
                    previous_p_cnt++
                }
                localStorage.setItem('counter',`${cnt}`)
                if(sport_id==1)
                    localStorage.setItem('football',JSON.stringify(data))
                else if(sport_id == 2)
                    localStorage.setItem('basketball',JSON.stringify(data))
                else if(sport_id == 3)
                localStorage.setItem('mycricket',JSON.stringify(data))
                else 
                localStorage.setItem('kabaddi',JSON.stringify(data))

                location.reload()
        })
}

let remove_player_data = function(sport_id,series_index,team_index)
{


        rpd_panel = document.querySelector('#remove_player_data_panel')
        rpd_panel.style.display="block"
        rpdp = document.querySelector('#remove_player_data_placer')
        all_value = [['','WK','BAT','AL','BOWL'],
        ['','GK','DEF','MID','ST'],
        ['','PG','SG','SF','PF','CE'],
        ['','WK','BAT','AL','BOWL'],
        ['','DEF','ALL','RAI']

        ]
        role_value = all_value[sport_id]
        data = null
        if(sport_id==1)
            data = JSON.parse(localStorage.getItem('football'))
        else if (sport_id == 2)
            data = JSON.parse(localStorage.getItem('basketball'))
        else if(sport_id == 3)
            data = JSON.parse(localStorage.getItem('mycricket'))
        else
            data = JSON.parse(localStorage.getItem('kabaddi'))

        if(data.req_data[series_index].teams[team_index].players.length==0)
        {
            ele = document.createElement('h6')
            ele.textContent="This Team is Already Empty!"
            ele.classList.add('mt-4')
            rpdp.appendChild(ele)
        }   
        else{
        data.req_data[series_index].teams[team_index].players.forEach((player)=>
        {
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_index=document.createElement('span')
        span_index.textContent=player.player_index
        span_index.setAttribute("id","p_index")
        span_index.style.display="none"
        span_name.textContent=player.player_name
        span_name.setAttribute("id","span_name")
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role_value[player.player_role]
        span_credits = document.createElement('span')
        span_credits.textContent=player.player_credits
        inner_div2.classList.add('d-flex','justify-content-between')
        inner_div2.appendChild(span_role)
        inner_div2.appendChild(span_credits)
        inner_div1.appendChild(span_name)
        inner_div1.appendChild(span_index)
        inner_div1.appendChild(inner_div2)
        inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
        var img = document.createElement('img');
        var image_flag = data.req_data[series_index].image_present
        if(image_flag !=undefined && image_flag == 1)
        img.src = player.player_image;
        else 
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        outer_div.appendChild(img)
        outer_div.appendChild(inner_div1)
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','remove_vp_data')
        rpdp.appendChild(outer_div)
    })
    team_one_data = document.querySelectorAll('.remove_vp_data')
    console.log(team_one_data.length)
    team_one_data.forEach((obj)=>
    {
        obj.addEventListener('click',()=>
        {
            if(Array.from(obj.classList).includes('border-grey'))
            {
                obj.classList.remove('border-grey')
                obj.classList.add('border-pink')
            }
            else{
                obj.classList.remove('border-pink')
                obj.classList.add('border-grey')
            }
        })
    })
    rpdc = document.querySelector('#remove_player_data_continue')
    rpdc.addEventListener('click',()=>
    {
        data_list = team_one_data
        remove_list=[]
       // console.log(data_list.length)
        data_list.forEach((obj,index)=>
        {
            if(Array.from(obj.classList).includes('border-pink')){
                remove_list.push(index)
                console.log('pink')
            }
        })
        //onsole.log(remove_list)
        curr_data = data.req_data[series_index].teams[team_index].players
      //  console.log(curr_data)
        let cnt=0
        remove_list.forEach((data_one)=>
        {
            curr_data.splice(data_one-cnt,1)
            cnt++  
        })
      //  console.log(curr_data)
        data.req_data[series_index].teams[team_index].players=curr_data
        if(sport_id==1)
            localStorage.setItem('football',JSON.stringify(data))
        else if(sport_id == 2)
            localStorage.setItem('basketball',JSON.stringify(data))
        else if(sport_id == 3)
            localStorage.setItem('mycricket',JSON.stringify(data))
        else 
            localStorage.setItem('kabaddi',JSON.stringify(data))
        location.reload()       
    })
    }

}

let edit_player_data = function(sport_id,series_index,team_index)
{
    epd_panel = document.querySelector('#edit_player_data_panel')
    epd_panel.style.display="block"
    epdp = document.querySelector('#edit_player_data_placer')
    all_value = [['','WK','BAT','AL','BOWL'],
    ['','GK','DEF','MID','ST'],
    ['','PG','SG','SF','PF','CE'],
    ['','WK','BAT','AL','BOWL'],
    ['','DEF','ALL','RAI']

    ]
    role_value = all_value[sport_id]
    data = null
    if(sport_id==1)
        data = JSON.parse(localStorage.getItem('football'))
    else if(sport_id == 2)
        data = JSON.parse(localStorage.getItem('basketball'))
    else if(sport_id == 3)
        data = JSON.parse(localStorage.getItem('mycricket'))
    else 
        data = JSON.parse(localStorage.getItem('kabaddi'))
    //console.log(data)
    if(data.req_data[series_index].teams[team_index].players.length==0)
    {
        ele = document.createElement('h6')
        ele.textContent="This Team is Empty!"
        ele.classList.add('mt-4')
        epdp.appendChild(ele)
    }   
    else{
    data.req_data[series_index].teams[team_index].players.forEach((player)=>
    {
    //------
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','justify-content-around','flex-wrap','container','border-grey','m-2','align-items-center')
        img = document.createElement('img')
        var image_flag = data.req_data[series_index].image_present
        if(image_flag !=undefined && image_flag == 1)
        img.src = player.player_image;
        else 
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        h4 = document.createElement('h6')
        h4.textContent = player.player_name
        inner_div_one = document.createElement('div')
        span_role = document.createElement('small')
        span_role.textContent="Role :"
        select_role = document.createElement('SELECT')
        for(let i=1;i<role_value.length;i++)
        {
            temp = document.createElement('option')
            temp.setAttribute('value',i)
            temp.textContent=role_value[i]
            if(player.player_role==i)
                temp.setAttribute('selected','selected')
            select_role.appendChild(temp)
        }
        select_role.setAttribute('id','pr')
        inner_div_one.appendChild(span_role)
        inner_div_one.appendChild(select_role)
        inner_div_two = document.createElement('div')
        span_credits = document.createElement('small')
        span_credits.textContent="Credits :"
        input_credits = document.createElement('input')
        input_credits.setAttribute('type','number')
        input_credits.classList.add('input-change-size')
        input_credits.value = player.player_credits
        input_credits.setAttribute('id','pc')
        inner_div_two.appendChild(span_credits)
        inner_div_two.appendChild(input_credits)
        inner_div_one.classList.add('final_kvp')
        inner_div_two.classList.add('final_kvp')
        outer_div.appendChild(img)
        outer_div.appendChild(h4)
        outer_sub_div = document.createElement('div')
        outer_sub_div.classList.add('d-flex','flex-wrap','justify-content-around','align-items-center','m-2','p-2')
        outer_sub_div.appendChild(inner_div_one)
        outer_sub_div.appendChild(inner_div_two)
        outer_div.appendChild(outer_sub_div)
        epdp.appendChild(outer_div)
    })
    //------
     // just continue
     cpu = document.getElementById('edit_player_data_continue')
     cpu.addEventListener('click',()=>
     {
         pr_list = document.querySelectorAll('#pr')
         pc_list = document.querySelectorAll('#pc')
         pr_data=[]
         pc_data=[]
         pr_list.forEach((ele)=>
         {
             pr_data.push(Number(ele.value))
         })
         pc_list.forEach((ele)=>
         {
             pc_data.push(Number(ele.value))
         })
         data.req_data[series_index].teams[team_index].players.forEach((player,index)=>
         {
             player.player_role=pr_data[index]
             player.player_credits=pc_data[index]
         })
         if(sport_id==1)
            localStorage.setItem('football',JSON.stringify(data))
        else if(sport_id == 2)
            localStorage.setItem('basketball',JSON.stringify(data))
        else if(sport_id == 3)
            localStorage.setItem('mycricket',JSON.stringify(data))
        else 
            localStorage.setItem('kabaddi',JSON.stringify(data))
         SuccessMsg('Player data updated Successfully!')
         location.reload()
    })
}
}

let secondary_edit_series = function(sport_id)
{
    console.log(sport_id)
    data = null
    if(sport_id==1)
    data = JSON.parse(localStorage.getItem('football'))
    else if(sport_id == 2)
    data = JSON.parse(localStorage.getItem('basketball'))
    else if(sport_id == 3)
    data = JSON.parse(localStorage.getItem('mycricket'))
    else 
    data = JSON.parse(localStorage.getItem('kabaddi'))
    sesp = document.querySelector('#secondary_edit_series_placer')
    if(data.req_data.length==0)
    {
       es = document.querySelector('#empty_series_secondary')
       es.style.display="block"
       escst = document.querySelector('#empty_secondary_create_series_two')
       escst.addEventListener('click',()=>
       {
        sfp = document.querySelector('#secondary_edit_series_panel')
        sfp.style.display="none"
        csp = document.querySelector('#create_series_panel')
        csp.style.display="block"
        secondary_create_series(sport_id,-1)
       })
     
    }
    else{

    jp = document.querySelector('#secondary_edit_continue_block')
    jp.style.display="block"
    for(let i=0;i<data.req_data.length;i++)
    {
        if(data.req_data[i].data_type==1)
        {
        img = document.createElement('img')

        
        img.src="dream11_images/"+data.req_data[i].code+".jpg"
        img.classList.add('team-image')
        img.setAttribute('id','series_logo')
        sesp.appendChild(img)
        }
        else {
        v_div = document.createElement('div')
        h6 = document.createElement('h6')
        h6.style.paddingTop="5px"
        h6.textContent=data.req_data[i].code
        v_div.appendChild(h6)
        v_div.style.border="1px solid black"
        v_div.style.backgroundColor="#F5F5F5"
        v_div.classList.add('team-image','d-flex','justify-content-center','align-items-center')
        v_div.setAttribute('id','series_logo')
        sesp.appendChild(v_div)
        }
    }
    sl = document.querySelectorAll('#series_logo')
    sl.forEach((ele,index)=>
    {
        ele.addEventListener('click',()=>
         {
            sl.forEach((temp)=>
            {
                temp.classList.remove('border-grey')
            })
            ele.classList.add('border-grey')
        })
    })

    sesc = document.querySelector('#secondary_edit_series_continue')
    sesc.addEventListener('click',()=>
    {
        let series_index=-1
        sl.forEach((temp,index)=>
        {
           if(Array.from(temp.classList).includes('border-grey'))
            series_index=index 
        })
        if(series_index!=-1)
        {
            sesp = document.querySelector('#secondary_edit_series_panel')
            sesp.style.display="none"
            csp = document.querySelector('#create_series_panel')
            csp.style.display="block"
            secondary_create_series(sport_id,series_index)
        }
        else{
            raiseError('Should select the series')
            return
        }
    })
}
}
