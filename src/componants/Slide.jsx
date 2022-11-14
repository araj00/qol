import React, { useMemo,useEffect } from 'react'
import { slides } from '../assets/data';
import $ from 'jquery'
require('jquery')
require('bootstrap')

const Slide = () => {

    let question = 0;

    function showScore() {
        let values;
        let dimension;
        let dimensionName;
        let counter = 1;
        let scores = {};
        let names = {};
        let output = "";
        values = $("input:radio:checked");
    
        for (let i = 0; i < values.length; i++)
        {
          dimension = $(values[i]).data("dimension-name");
          if(typeof scores[dimension] == "undefined") {
            scores[dimension] = parseInt($(values[i]).val());
            names[dimension] = 1;
          } else {
            scores[dimension] += parseInt($(values[i]).val());
            names[dimension] += 1;
          }
        }
    
        for(dimension in scores) {
          let highestScore = names[dimension] * 5;
          let scorePercent = scores[dimension] * 100 / highestScore;
          output += "<div>Dimension " + counter + ": " + dimension + "</div>";
          output += "<div class='progress'><div aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + scorePercent + "' class='progress-bar' role='progressbar' style='width:" + scorePercent + "%;'></div></div>";
          counter += 1;
        }
        $(".results").html(output);
      }
    const JqueryCode = (name) => {
        
          // Toggles the animated background color fill on the label for each radio button
          // And fires the next slide in the carousel
          $("input").on("click",function() {
            $("input:not(:checked)").parent().removeClass("checked");
            $("input:checked").parent().addClass("checked");
            $(".carousel").delay(600).queue(function() {
              $('.carousel').carousel('next');
              $('.carousel').dequeue();
            });
            showScore();
          });
    }
    useEffect(() => {
        JqueryCode("hello");
    },[])

    let questionTotal = useMemo(() => {
        let count = 0;
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].radios === true) {
                count += 1;
            }
        }
        console.log(Array.isArray(slides));
        return count
    }, [Slide.length])

    return (
        (slides.map((slide, index) => {
            return (
                <div key={index} className='carousel-inner'>
                    <div className={`item ${!index ? "active" : ""}`}>
                        <div className={`section ${slide.color}`}>
                            <div className='section-header'>
                                <h2>This is the header</h2>
                            </div>
                            <div className='question'>
                                <div className='question-number clearfix'>
                                    {
                                        (() => {
                                            if (slide.intro === true) {
                                                return <>
                                                    <p>Introduction</p>
                                                    <hr />
                                                </>
                                            }
                                            else if (slide.radios === true) {
                                                question++;
                                                return <>
                                                    <p>Question {question} of {questionTotal}</p>
                                                    <hr />
                                                </>
                                            }
                                            else if (slide.result === true) {
                                                return <>
                                                    <p>Result</p>
                                                    <hr />
                                                </>
                                            }
                                        })()
                                    }
                                </div>
                                <p>{slide.text}</p>
                                {
                                    slide.radios
                                        ?
                                        <>
                                            <div className='radio-button-group'>
                                                <label className="radio">
                                                    <input type="radio" id={`radios${index}`} name={`radios${index}`}
                                                        value='1' data-dimension-name={slide.dimensionName} data-dimension={slide.dimension} />
                                                    "Very dissatisfied"
                                                </label>


                                                <label className="radio">
                                                    <input
                                                        id={`radios${index}`}
                                                        name={`radios${index}`}
                                                        type="radio"
                                                        defaultValue={4}
                                                        data-dimension-name={slide.dimensionName}
                                                        data-dimension={slide.dimension}
                                                    />
                                                    Dissatisfied
                                                </label>
                                                <label className="radio">
                                                    <input
                                                        id={`radios${index}`}
                                                        name={`radios${index}`}
                                                        type="radio"
                                                        defaultValue={3}
                                                        data-dimension-name={slide.dimensionName}
                                                        data-dimension={slide.dimension}
                                                    />
                                                    Neither satisfied nor dissatisfied
                                                </label>
                                                <label className="radio">
                                                    <input
                                                        id={`radios${index}`}
                                                        name={`radios${index}`}
                                                        type="radio"
                                                        defaultValue={4}
                                                        data-dimension-name={slide.dimensionName}
                                                        data-dimension={slide.dimension}
                                                    />
                                                    Satisfied
                                                </label>
                                                <label className="radio">
                                                    <input
                                                        id={`radios${index}`}
                                                        name={`radios${index}`}
                                                        type="radio"
                                                        defaultValue={5}
                                                        data-dimension-name={slide.dimensionName}
                                                        data-dimension={slide.dimension}
                                                    />
                                                    Very satisfied
                                                </label>

                                                <div className="test-submit clearfix">
                                                    <a data-slide="prev" href="#feedbackTest">
                                                        &lt; Previous question
                                                    </a>
                                                </div>
                                            </div>

                                        </>
                                        :
                                        slide.result
                                            ?
                                            <div className='results'></div>
                                            :
                                            slide.button
                                                ?
                                                <div className='clearfix'>
                                                    <button href="#feedbackTest" className='btn center-block' data-slide="next">{slide.buttonText}</button>
                                                </div>
                                                :
                                                ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        ))

            

    )

}




export default Slide