import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  private db: string = 'assets/db.json';
  public offers!: Array<any>;

  constructor() { }

  ngOnInit(): void {
    Promise.all([fetch(this.db)])
      .then(async([aa]) => {
      const data = await aa.json();
      return [data]
    })
      .then((responseText) => {
        this.offers = responseText[0].response.data;
      }).catch((err) => {
      console.log(err);
    });
  }

  public applyFilterGlobal(event: any, stringVal: string): void {
    this.dt!.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

}
