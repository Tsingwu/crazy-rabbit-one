import { expect } from 'chai'
import ElementUI from 'element-ui'
import { mount, createLocalVue  } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import api from '@/api'

const localVue = createLocalVue();

localVue.use(ElementUI)
localVue.use(api)

let user = null;

// beforeEach(function(done) {
//   api.common.syncCheckcode().then(res => {
//     let params = {
//       accountCode: 'sz2747',
//       username: 'fenghan',
//       password: '1',
//       checkcode: '8998',
//       rememberMe: false
//     };
//
//     api.common.syncLogin(params).then(res => {
//       user = res.data.user;
//       done()
//     })
//   });
// });

describe('公共组件-侧边栏', () => {
  const wrapper = mount(Sidebar,{
    // sync : true,
    localVue
  });
  
  
  before(function (done) {
    let _this = this;
    api.common.syncCheckcode().then(res => {
      let params = {
        accountCode: 'sz2747',
        username: 'fenghan',
        password: '1',
        checkcode: '8998',
        rememberMe: false
      };
    
      _this.timeout(5000)
      api.common.syncLogin(params).then(data => {
        user = data.data.user;
      })
    });
    done()
  });
  
  
  it('加载关注版面', (done) => {
    expect(wrapper.vm.isShowConcern).to.equal(false);
  
    wrapper.find('.gz').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isShowConcern).to.equal(true);
      done()
    })
    
  });
  
  it('收起关注版面', (done) => {
    wrapper.find('.gz').trigger('click');
  
    expect(wrapper.vm.isShowConcern).to.equal(true);
    //收起关注版面
    wrapper.find('.sidebar-gz-icon-hide').trigger('click');
  
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isShowConcern).to.equal(false);
      done()
    })
    
  });
  
  it('点击遮罩层收起关注版面', (done) => {
  
    wrapper.find('.gz').trigger('click');
  
    expect(wrapper.vm.isShowConcern).to.equal(true);
    //收起关注版面
    wrapper.find('.sidebar-gz-mask').trigger('click');
  
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isShowConcern).to.equal(false);
      done()
    })
  
  });
  
  // it('回到顶部', () => {
  //   console.log(wrapper.find('.el-scrollbar__thumb'));
  //   wrapper.find('.to-top').trigger('click');
  //
  //   const top = wrapper.find('.el-scrollbar__thumb').attributes().style;
  //   console.log(top);
  //
  //   expect(top).to.have.string('transform: translateY(0%)')
  // });
  
});