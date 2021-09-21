let handle_smart_section = function(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt)
{
    smart_panel = document.querySelector('#smart_panel')
    smart_panel.style.display="block"
    // console.log(series_index)
    // console.log(sd.req_data[series_index])
    let team_one_name = sd.req_data[series_index].teams_list[team_one_index]
    let team_two_name = sd.req_data[series_index].teams_list[team_two_index]
    // console.log(team_one_name)
    // console.log(team_two_name)
    //adding strong teams panel 
    strong_team_placer = document.querySelector('#strong_team_placer')
    div1 = document.createElement('div')
    div2 = document.createElement('div')
    div3 = document.createElement('div')
    img1= document.createElement('img')
    img1.classList.add('kvp-icon')
    img1.src=`dream11_images/${team_one_name}.jpg`
    img2= document.createElement('img')
    img2.classList.add('kvp-icon')
    img2.src=`dream11_images/${team_two_name}.jpg`
    div1.appendChild(img1)
    div2.appendChild(img2)
    span1 = document.createElement('span')  
    span2 = document.createElement('span')
    span1.textContent= team_one_name
    span2.textContent= team_two_name
    icon = document.createElement('i')
    icon.classList.add('fa','fa-balance-scale')
    div3.appendChild(icon)
    span3 = document.createElement('span')
    span3.textContent="Equal"
    div3.appendChild(span3)
    div1.appendChild(span1)
    div2.appendChild(span2)
    div1.classList.add('team_report','border-grey')
    div2.classList.add('team_report','border-grey')
    div3.classList.add('team_report','border-grey')
    strong_team_placer.appendChild(div1)
    strong_team_placer.appendChild(div2)
    strong_team_placer.appendChild(div3)
    //done with the rendering part 
    var first = false 
    var second = false
    var pitch_value = -1
    var strong_team_value = -1
    //now handing the user response 
    pitch_report = document.querySelectorAll('.pitch_report')
    console.log(pitch_report)
    pitch_report.forEach((element,index)=>{

        element.addEventListener('click',()=>{
            pitch_report.forEach((node)=> node.classList.remove('border-green'))
            pitch_report.forEach((node)=> node.classList.add('border-grey'))
            element.classList.remove('border-grey')
            element.classList.add('border-green')
            first = true 
            pitch_value = index
        })  
    })
    // now strong -> team report  
    team_report = document.querySelectorAll('.team_report')
    team_report.forEach((element,index)=>{
        element.addEventListener('click',()=>{
            team_report.forEach((node)=> node.classList.remove('border-green'))
            team_report.forEach((node)=>node.classList.add('border-grey'))
            element.classList.remove('border-grey')
            element.classList.add('border-green')
            second = true 
            strong_team_value = index
        }) 
    })
    // now toss report 
    toss_yes = document.querySelector('.toss_report_yes')
    toss_no = document.querySelector('.toss_report_no')
    toss_yes.addEventListener('click',()=>{
       if(!first)
       {
           raiseError('Select Pitch Report')
           return  
       }
       if(!second)
       {
           raiseError('Select team strength')
           return 
       }
       ftp = document.querySelector('#first_toss_panel')
       ftp.style.display="none"
           spinner = document.querySelector('#vp_spinner')
           spinner.style.display="block"
           setTimeout(()=>{
               spinner.style.display="none"
               console.log('h1-1')
               stp = document.querySelector('#second_toss_panel')
               stp.style.display="block"
               console.log('hi-2')
               st_placer = document.querySelector('#second_toss_placer')
               //--------
               console.log('hi-3')
               div1 = document.createElement('div')
               div2 = document.createElement('div')
               img1= document.createElement('img')
               img1.classList.add('kvp-icon')
               img1.src=`dream11_images/${team_one_name}.jpg`
               img2= document.createElement('img')
               img2.classList.add('kvp-icon')
               img2.src=`dream11_images/${team_two_name}.jpg`
               div1.appendChild(img1)
               div2.appendChild(img2)
               span1 = document.createElement('span')  
               span2 = document.createElement('span')
               span1.textContent= team_one_name
               span2.textContent= team_two_name
               div1.appendChild(span1)
               div2.appendChild(span2)
               div1.classList.add('toss_won','border-grey')
               div2.classList.add('toss_won','border-grey')
               st_placer.appendChild(div1)
               st_placer.appendChild(div2)
               console.log('hi-4')
               //----------
               tw = document.querySelectorAll('.toss_won')
               tw.forEach((element,index)=>{
                  element.addEventListener('click',()=>{
                        stp.style.display="none"
                        spinner = document.querySelector('#vp_spinner')
                        spinner.style.display="block"
                        setTimeout(()=>{
                            spinner.style.display="none"
                            ttp = document.querySelector('#third_toss_panel')
                            ttp.style.display="block"
                            tth = document.querySelector('#third_toss_header')
                            tw_batting = document.querySelector('.toss_result_batting')
                            tw_bowling = document.querySelector('.toss_result_bowling')
                            if(index==0)
                            {
                                tth.textContent=`${team_one_name} Opted for?`
                                tw_batting.addEventListener('click',()=>{
                                    ttp.style.display="none"
                                    spinner = document.querySelector('#vp_spinner')
                                    spinner.style.display="block"
                                    setTimeout(()=>{
                                        spinner.style.display="none"
                                        sc = document.querySelector('#smart_continue')
                                        sc.style.display="block"
                                        // collecting the data 
                                        bobby_obj = {
                                            pitch_value:pitch_value,
                                            strong_team_value : strong_team_value,
                                            toss:true,
                                            toss_won:0,
                                            toss_result:0
                                        }
                                        sc.addEventListener('click',()=>{
                                            smart_panel.style.display="none"
                                        team_generator(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt,bobby_obj)

                                        })
                                    },2000) 
                                })
                                tw_bowling.addEventListener('click',()=>{
                                    ttp.style.display="none"
                                    spinner = document.querySelector('#vp_spinner')
                                    spinner.style.display="block"
                                    setTimeout(()=>{
                                        spinner.style.display="none"
                                        sc = document.querySelector('#smart_continue')
                                        sc.style.display="block"
                                        //collecting the data 
                                        bobby_obj = {
                                            pitch_value:pitch_value,
                                            strong_team_value : strong_team_value,
                                            toss:true,
                                            toss_won:0,
                                            toss_result:1
                                        }
                                        sc.addEventListener('click',()=>{
                                            smart_panel.style.display="none"
                                            team_generator(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt,bobby_obj)
    
                                            })
                                    },2000) 
                                })
                            }
                            else 
                            {
                                tth.textContent=`${team_two_name} Opted for?`
                                tw_batting.addEventListener('click',()=>{
                                    ttp.style.display="none"
                                    spinner = document.querySelector('#vp_spinner')
                                    spinner.style.display="block"
                                    setTimeout(()=>{
                                        spinner.style.display="none"
                                        sc = document.querySelector('#smart_continue')
                                        sc.style.display="block"
                                        bobby_obj = {
                                            pitch_value:pitch_value,
                                            strong_team_value : strong_team_value,
                                            toss:true,
                                            toss_won:1,
                                            toss_result:0
                                        }
                                        sc.addEventListener('click',()=>{
                                            smart_panel.style.display="none"
                                            team_generator(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt,bobby_obj)
    
                                            })
                                    },2000) 
                                })
                                tw_bowling.addEventListener('click',()=>{
                                    ttp.style.display="none"
                                    spinner = document.querySelector('#vp_spinner')
                                    spinner.style.display="block"
                                    setTimeout(()=>{
                                        spinner.style.display="none"
                                        sc = document.querySelector('#smart_continue')
                                        sc.style.display="block"
                                        bobby_obj = {
                                            pitch_value:pitch_value,
                                            strong_team_value : strong_team_value,
                                            toss:true,
                                            toss_won:1,
                                            toss_result:1
                                        }
                                        sc.addEventListener('click',()=>{
                                            smart_panel.style.display="none"
                                            team_generator(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt,bobby_obj)
    
                                            })
                                    },2000) 
                                })
                            }
                        },2000)
                  })
               })

           },2000)
    })
    toss_no.addEventListener('click',()=>{
        if(!first)
        {
            raiseError('Select Pitch Report')
            return 
        }
        if(!second)
        {
            raiseError('Select team strength')
            return 
        }
        ftp = document.querySelector('#first_toss_panel')
        ftp.style.display="none"
            spinner = document.querySelector('#vp_spinner')
            spinner.style.display="block"
            setTimeout(()=>{
                spinner.style.display="none"
                sc = document.querySelector('#smart_continue')
                sc.style.display="block"
                bobby_obj = {
                    pitch_value:pitch_value,
                    strong_team_value : strong_team_value,
                    toss:false,
                    toss_won:-1,
                    toss_result:-1
                }
                sc.addEventListener('click',()=>{
                    smart_panel.style.display="none"
                    team_generator(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index,mode,sport_id,fantasyt,bobby_obj)

                    })
            },2000)
     })

    console.log(vp_obj)
}