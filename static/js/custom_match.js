let custom_comb = [
    [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
    [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
    [3,3,2,3],[3,4,1,3],[3,3,1,4],
    [4,3,1,3]
 ]

coc = document.querySelector("#custom_one_continue")
coc.addEventListener('click',()=>
{
    input_team_one_name = document.querySelector('#c_team_one_name').value
    input_team_two_name = document.querySelector('#c_team_two_name').value
    if(input_team_one_name=='' || input_team_two_name==''){
        raiseError('Team name cannot be Empty!')
        return
    }
    c_one = document.querySelector('#custom_one')
    c_one.style.display="none"
    c_two=document.querySelector('#custom_two')
    c_two.style.display="block"
    cp = document.querySelector('#custom_panel')
    cp.classList.remove('without-size')
    cp.classList.add('with-size')
    custom_input = document.querySelector('#custom_input')
    custom_input.style.display="block"
    c_i_one=document.querySelector('#c_i_team_one_name')
    c_i_two=document.querySelector('#c_i_team_two_name')
    cton = document.querySelector('#custom_team_one_name')
    cttn = document.querySelector('#custom_team_two_name')
    c_i_one.textContent=input_team_one_name
    c_i_two.textContent=input_team_two_name
    cton.textContent=input_team_one_name
    cttn.textContent=input_team_two_name
})

c_i_one=document.querySelector('#c_i_team_one_name')
c_i_two=document.querySelector('#c_i_team_two_name')

c_i_one.addEventListener('click',()=>
{
    c_i_two.classList.remove('border-grey')
    c_i_one.classList.add('border-grey')
    ct_1 = document.querySelector('#ct_1')
    ct_2 = document.querySelector('#ct_2')
    ct_1.style.display="none"
    ct_2.style.display="none"
    t_1_trigger = document.querySelector('#t_1_trigger')
    t_1_trigger.style.display="block"
    t_2_trigger = document.querySelector('#t_2_trigger')
    t_2_trigger.style.display="none"
})
c_i_two.addEventListener('click',()=>
{
    c_i_one.classList.remove('border-grey')
    c_i_two.classList.add('border-grey')
    ct_1 = document.querySelector('#ct_1')
    ct_2 = document.querySelector('#ct_2')
    ct_1.style.display="none"
    ct_2.style.display="none"
    t_2_trigger = document.querySelector('#t_2_trigger')
    t_2_trigger.style.display="block"
    t_1_trigger = document.querySelector('#t_1_trigger')
    t_1_trigger.style.display="none"
})

t_1_trigger = document.querySelector('#t_1_trigger')
t_1_trigger.addEventListener('click',()=>
{
    t1_n = document.querySelector('#t1_n')
    t1_c = document.querySelector('#t1_c')
    t1_n.value=''
    t1_c.value =''
    ct_1 = document.querySelector('#ct_1')
    t_1_trigger.style.display="none"
    ct_1.style.display="block"
})

t_2_trigger = document.querySelector('#t_2_trigger')
t_2_trigger.addEventListener('click',()=>
{
    t2_n = document.querySelector('#t2_n')
    t2_c = document.querySelector('#t2_c')
    t2_n.value=''
    t2_c.value =''
    ct_2 = document.querySelector('#ct_2')
    t_2_trigger.style.display="none"
    ct_2.style.display="block"
})
role_list = ['','WK','BAT','AL','BOWL']
t1_a = document.querySelector('#t1_a')
t1_a.addEventListener('click',()=>
{
    t1_n = document.querySelector('#t1_n')
    t1_r = document.querySelector('#t1_r')
    t1_c = document.querySelector('#t1_c')
    let name = t1_n.value
    let credit = t1_c.value
    let role = role_list[t1_r.value]
    if(name=='' || credit=='')
    {
        raiseError('These fields cannot be empty!')
        return
    }
    t1_n.value=''
    t1_c.value=''
    vp_list = document.querySelectorAll('.custom_team_one_data')
    if(vp_list.length ==11)
    {
        raiseError('you have already entered team one data!')
        return;
    }
    ctoc = document.querySelector('#custom_team_one_container')
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.setAttribute('id','player_name')
        span_name.textContent=name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role
        span_credits = document.createElement('span')
        span_credits.setAttribute('id','player_credits')
        span_credits.textContent=credit
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
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','custom_team_one_data')
        ctoc.appendChild(outer_div)
    SuccessMsg('data recorded successfully!')
})

//-----
t2_a = document.querySelector('#t2_a')
t2_a.addEventListener('click',()=>
{
    t2_n = document.querySelector('#t2_n')
    t2_r = document.querySelector('#t2_r')
    t2_c = document.querySelector('#t2_c')
    let name = t2_n.value
    let credit = t2_c.value
    let role = role_list[t2_r.value]
    if(name=='' || credit=='')
    {
        raiseError('These fields cannot be empty!')
        return
    }
    t2_n.value=''
    t2_c.value=''
    vp_list = document.querySelectorAll('.custom_team_two_data')
    if(vp_list.length ==11)
    {
        raiseError('you have already entered team one data!')
        return;
    }
    cttc = document.querySelector('#custom_team_two_container')
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.setAttribute('id','player_name')
        span_name.textContent=name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role
        span_credits = document.createElement('span')
        span_credits.setAttribute('id','player_credits')
        span_credits.textContent=credit
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
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','custom_team_two_data')
        cttc.appendChild(outer_div)
    SuccessMsg('data recorded successfully!')
})

ctc = document.querySelector('#custom_two_continue')
ctc.addEventListener('click',()=>
{
    ctod = document.querySelectorAll('.custom_team_one_data')
    cttd = document.querySelectorAll('.custom_team_two_data')
    if(ctod.length < 7 || cttd.length <7)
    {
        raiseError('you should Enter Atleast 7 players from each side!')
        return;
    }
    // -----------

    let wk_cnt=0
    let bat_cnt=0
    let bowl_cnt=0
    let al_cnt=0
    let team_one_players=[]
    let team_two_players=[]
    let player_id=1;
    ctod.forEach((obj,index)=>
    {
            let temp_r = obj.querySelector('#player_role').textContent
            let temp_c = obj.querySelector('#player_credits').textContent
            let temp_n = obj.querySelector('#player_name').textContent
           team_one_players.push(new Player(temp_n,role_list.indexOf(temp_r),parseFloat(temp_c),0,index,0,player_id))
           if(temp_r =='WK') wk_cnt++
           else if(temp_r=='BAT') bat_cnt++
           else if(temp_r == 'BOWL') bowl_cnt++
           else al_cnt++
           player_id++
    })
    cttd.forEach((obj,index)=>
    {
        let temp_r = obj.querySelector('#player_role').textContent
        let temp_c = obj.querySelector('#player_credits').textContent
        let temp_n = obj.querySelector('#player_name').textContent
       team_two_players.push(new Player(temp_n,role_list.indexOf(temp_r),parseFloat(temp_c),0,index,1,player_id))
       if(temp_r =='WK') wk_cnt++
       else if(temp_r=='BAT') bat_cnt++
       else if(temp_r == 'BOWL') bowl_cnt++
       else al_cnt++
       player_id++
    })
    if(wk_cnt<1 || bat_cnt<3 || al_cnt<1 || bowl_cnt<3)
    {
        raiseError('Atleast 1 -wk, 3- bat, 1 -al , 3- bowl should be there!')
        return
    }
   // console.log(team_one_players)
   // console.log(team_two_players)
    req_comb=[]
    custom_comb.forEach((comb)=>
   {
      if(comb[0]<=wk_cnt && comb[1]<=bat_cnt && comb[2]<=al_cnt && comb[3]<=bowl_cnt)
         req_comb.push(comb)
   })
    let wk=[]
    let bat=[]
    let al=[]
    let bowl=[]
    team_one_players.forEach((player)=>
    {
        if(player.player_role==1) wk.push(player)
        else if(player.player_role==2) bat.push(player)
        else if(player.player_role==3) al.push(player)
        else bowl.push(player)
    })
    team_two_players.forEach((player)=>
    {
        if(player.player_role==1) wk.push(player)
        else if(player.player_role==2) bat.push(player)
        else if(player.player_role==3) al.push(player)
        else bowl.push(player)
    })
    cin=document.querySelector('#custom_input')
    cin.style.display="none"
    cpa=document.querySelector('#custom_panel')
    cpa.style.display="none"
    number_panel = document.querySelector('#generate_panel')
    number_panel.style.display="block"
    trm = document.querySelector('#teams_range_msg')
    trm.textContent="you can only generate teams of  1 - 2000 teams only!"
    team_number = document.getElementById('team_number')
    team_number.addEventListener('click',()=>
    {
    nt =  Number(document.querySelector('#number_teams').value)
    if(nt<1 || nt>2000){raiseError('Numbers of teams should be 1 - 2000 range'); return}

    team_generator_helper_two([[],wk,bat,al,bowl],[[],[],[],[],[]],req_comb,0,1,nt,1,93,100,team_one_players,team_two_players,team_one_players,team_two_players,[0,0,0,0,0],[0,1,2,3],1,1,0)
    })
})

