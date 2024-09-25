import React from 'react'
import './CourseList.css';

const CourseList = () => {
    return (
        <div>

            <div>
                <nav className="Side_Bar_AC">
                    <div style={{marginTop:'50px', marginLeft: '25px',marginRight: '25px'}}>
                        <ol class="list-group list-group-numbered">
                            <li class="list-group-item">Sinhala - GE000</li>
                            <li class="list-group-item">Tamil - GE001</li>
                            <li class="list-group-item">English - GE002</li>
                            <li class="list-group-item">Mathematics - GE003</li>
                            <li class="list-group-item">Science - GE004</li>
                            <li class="list-group-item">History - GE005</li>
                            <li class="list-group-item">Geography - GE006</li>
                            <li class="list-group-item">Commerce - OL001</li>
                            <li class="list-group-item">ICT - AL001</li>
                            <li class="list-group-item">Physics - AL002</li>
                            <li class="list-group-item">Chemistry - AL003</li>
                            <li class="list-group-item">Combined Mathematics - AL004</li>
                            <li class="list-group-item">Biology - AL005</li>
                            <li class="list-group-item">Agricultural Science - AL006</li>
                            <li class="list-group-item">Accounting - AL007</li>
                            <li class="list-group-item">Business Studies - AL008</li>
                            <li class="list-group-item">Economics - AL009</li>
                            <li class="list-group-item">Business Statistics - AL010</li>
                        </ol>
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default CourseList