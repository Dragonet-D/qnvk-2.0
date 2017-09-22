var arr = [
  {
    "id": "1",
    "text": "测试1",
    "sort": "0",
    "parent_id": "0",
    "expanded": true,
    "children": [
      {
        "id": "138",
        "text": "那你那边",
        "sort": "0",
        "parent_id": "1",
        "leaf": true
      },
      {
        "id": "139",
        "text": "彻彻底底",
        "sort": "0",
        "parent_id": "1",
        "expanded": true,
        "children": [
          {
            "id": "146",
            "text": "滚滚滔滔",
            "sort": "0",
            "parent_id": "139",
            "leaf": true
          },
          {
            "id": "147",
            "text": "好好谈谈",
            "sort": "0",
            "parent_id": "139",
            "expanded": true,
            "children": [
              {
                "id": "161",
                "text": "回复的都",
                "sort": "0",
                "parent_id": "147",
                "leaf": true
              },
              {
                "id": "162",
                "text": "仿佛人多",
                "sort": "0",
                "parent_id": "147",
                "leaf": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "text": "测试二",
    "sort": "0",
    "parent_id": "0",
    "expanded": true,
    "children": [
      {
        "id": "141",
        "text": "据UU",
        "sort": "0",
        "parent_id": "2",
        "leaf": true
      },
      {
        "id": "142",
        "text": "IIUU呀",
        "sort": "0",
        "parent_id": "2",
        "leaf": true
      },
      {
        "id": "143",
        "text": "饭店等等3",
        "sort": "0",
        "parent_id": "2",
        "leaf": true
      }
    ]
  }
]
digui()

function digui() {
  for (var attr in arr) {
    for (var attr1 in arr[attr].children){
      console.log(arr[attr].children[attr1])
    }
  }
}
