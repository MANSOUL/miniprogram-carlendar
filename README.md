# miniprogram-carlendar
一个日常小程序demo，自带了几个独立组件，可脱离本项目使用

## 组件使用方式
- 引入组件
在`pages/xx-page/index.json`中，例:
```
{
  "usingComponents": {
    "carlendar": "../../components/carlendar/index",
    "cascade-view": "../../components/cascade-slide-view/index",
    "address-book": "../../components/address-book/index"
  }
}
```
- 使用组件
在`pages/xx-page/index.wxml`中，例:
```
<carlendar 
    bindmonthchange='handleMonthChange'
    binddatechange='handleDateChange'>
</carlendar>
```

## 日历组件
日历组件采用左右滑动无限加载月份，切换月份及日份时会触发回调
- `components/carlendar`
---
| 属性名 | 类型 | 说明 |
|:------:|:------:|:-------:|
| datechange | Function | 选中日期时触发的回调 |
| monthchange | Function | 切换月份时触发的回调 |

- 使用方法
```
<carlendar 
  bindmonthchange='handleMonthChange'
  binddatechange='handleDateChange'>
</carlendar>
```

## 可删除标签
可删除标签长按可弹出删除icon
- `components/deleteable-tag`
---
| 属性名 | 类型 | 说明 |
|:------:|:------:|:-------:|
| value | Any | 标签值 |
| inspectValue | Any | 当前的标签值 |
| customtap | Function | 标签点击回调函数 |
| deletetap | Function | 删除按钮点击回调函数 |

- 使用方法：
```
<deleteable-tag 
  wx:for="{{tags}}" 
  wx:key="{{item}}" 
  value="{{item}}"
  inspectValue="{{tag}}"
  bindcustomtap="handleTagTap"
  binddeletetap="handleTagDelete">
</deleteable-tag>
```

## 层叠滑动View
类似QQ消息项的组件，向右滑动会展示出操作项
- `components/cascade-slide-view`
---
| 属性名 | 类型 | 说明 |
|:------:|:------:|:-------:|
| ops | Array | 操作项数组 |
| optap | Function | 操作项点击回调 |
| height | Number | 高度 |
| identity | String | 项目唯一标志 |
| slot | Slot | 插槽 |

- 使用方法：
```
<cascade-view 
  height="110"
  ops="{{ops}}"
  wx:for="{{spendList}}" 
  wx:key="{{item.id}}"
  bindoptap="handleViewOpTap">
  <text>这里是插槽</text>
</cascade-view>
```

## 通讯簿组件
仿微信通讯录组件

- `components/address-book`
---
| 属性名 | 类型 | 说明 |
|:------:|:------:|:-------:|
| dict | Object | 通讯录配置项 `{a: ['ab', 'ac'], b: ['bc', 'bd']}` |
| chars | Array | 配置项的keys `['a', 'b']` |
| handleAddressTap | Function | 通讯录项点击回调 |

- 使用方法：
```
<address-book 
    class="address-book"
    data="{{dict}}"
    chars="{{chars}}"
    binditemtap="handleAddressTap">
</address-book>
```



