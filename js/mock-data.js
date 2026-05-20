// gitddn demo mock data
// 화면에 직접 박혀 있던 하드코딩 데이터를 한 곳에서 관리하기 위한 데모용 데이터입니다.
(function(){
  const status = {
    approved:{label:'승인 완료', chip:'green'}, pending:{label:'승인 대기', chip:'orange'}, rejected:{label:'승인 반려', chip:'red'}, canceled:{label:'요청 취소', chip:''},
    open:{label:'Open', chip:'blue'}, merged:{label:'Merged', chip:'green'}, closed:{label:'Closed', chip:''}, draft:{label:'Draft', chip:''},
    passed:{label:'Passed', chip:'green'}, failed:{label:'Failed', chip:'red'}, running:{label:'Running', chip:'orange'}, warning:{label:'Warning', chip:'orange'}, pass:{label:'Pass', chip:'green'}, blocked:{label:'Blocked', chip:'red'}
  };
  const users = [
    {id:'jito', name:'Jito', email:'jito@company.com', role:'Maintainer', avatar:'J'},
    {id:'min', name:'Min', email:'min@company.com', role:'Tech Lead', avatar:'민'},
    {id:'han', name:'Han', email:'han@company.com', role:'Backend Lead', avatar:'한'},
    {id:'seo', name:'Seo', email:'seo@company.com', role:'QA', avatar:'서'},
    {id:'park', name:'Park', email:'security@company.com', role:'Security Reviewer', avatar:'박'},
    {id:'partner', name:'Partner Dev', email:'partner@company.com', role:'Developer', avatar:'P'}
  ];
  const repositories = [
    {id:'mobile-banking-api', name:'mobile-banking-api', groupKey:'banking', group:'Digital Banking / Mobile', typeKey:'typescript', type:'TypeScript', description:'은행 모바일 서비스의 계좌/인증 API Repository', status:'approved', favorite:true, updatedAt:'Updated 2 hours ago', role:'Maintainer', visibility:'Private'},
    {id:'customer-web-portal', name:'customer-web-portal', groupKey:'banking', group:'Digital Banking / Web', typeKey:'react', type:'React', description:'고객 웹 포털 화면과 인증 흐름을 관리하는 Repository', status:'approved', favorite:false, updatedAt:'Updated yesterday', role:'Developer', visibility:'Private'},
    {id:'common-ui-components', name:'common-ui-components', groupKey:'platform', group:'Platform Center / Shared Module', typeKey:'vue', type:'Vue', description:'공통 UI 컴포넌트 라이브러리 Repository 생성 요청', status:'pending', favorite:false, updatedAt:'Requested 5 hours ago'},
    {id:'partner-payment-sdk', name:'partner-payment-sdk', groupKey:'partner', group:'Partner Workspace', typeKey:'java', type:'Java', description:'외부 결제 SDK 연동 모듈 Repository 생성 요청', status:'rejected', favorite:false, updatedAt:'Rejected 1 day ago', rejectReason:'외부 파트너 SDK 반입 승인 문서가 누락되었습니다.'},
    {id:'legacy-report-batch', name:'legacy-report-batch', groupKey:'banking', group:'Digital Banking / Batch', typeKey:'python', type:'Python', description:'리포트 배치 작업을 분리하기 위한 Repository 생성 요청', status:'canceled', favorite:false, updatedAt:'Canceled 3 days ago'}
  ];
  const mergeRequests = [
    {id:128,title:'인증 정책 응답값 개선',summary:'로그인 정책 예외 케이스 응답값 정리 및 인증 API 응답 필드 표준화',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',source:'feature/login-policy',target:'develop',owner:'jito',author:'Jito',updatedAt:'20분 전',pipeline:'passed',security:'failed',securityLabel:'확인 필요',review:'need-review',reviewLabel:'리뷰 필요',approved:1,required:2,comments:8,status:'open'},
    {id:126,title:'계좌 목록 캐싱 개선',summary:'계좌 목록 API 응답 캐싱 처리 및 로딩 상태 개선',repo:'customer-web-portal',repoGroup:'Digital Banking / Web',source:'feature/account-cache',target:'develop',owner:'min',author:'Min',updatedAt:'2시간 전',pipeline:'failed',security:'pending',securityLabel:'대기',review:'draft',reviewLabel:'Draft',approved:0,required:2,comments:3,status:'open'},
    {id:121,title:'로그인 실패 메시지 정리',summary:'로그인 실패 케이스별 메시지 및 에러 코드 정리',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',source:'fix/login-message',target:'main',owner:'han',author:'Han',updatedAt:'어제',pipeline:'passed',security:'passed',securityLabel:'Passed',review:'approved',reviewLabel:'승인 완료',approved:2,required:2,comments:11,status:'merged'},
    {id:118,title:'외부 인증 모듈 교체',summary:'외부 파트너 인증 SDK 교체 요청',repo:'partner-payment-sdk',repoGroup:'Partner Workspace',source:'feature/external-auth',target:'develop',owner:'partner',author:'Partner Dev',updatedAt:'3일 전',pipeline:'canceled',security:'none',securityLabel:'-',review:'rejected',reviewLabel:'승인 반려',approved:0,required:2,comments:5,status:'closed'},
    {id:116,title:'공통 버튼 컴포넌트 접근성 개선',summary:'키보드 포커스와 ARIA 속성을 보완합니다.',repo:'common-ui-components',repoGroup:'Platform Center / Shared Module',source:'feature/a11y-button',target:'develop',owner:'seo',author:'Seo',updatedAt:'5일 전',pipeline:'passed',security:'passed',securityLabel:'Passed',review:'approved',reviewLabel:'승인 완료',approved:2,required:2,comments:4,status:'merged'}
  ];
  const pipelines = [
    {id:'2847502395',updatedAt:'3분 전',title:"Merge branch 'dg-fix-subgroup-menu' into main",repo:'root-sub-repo',repoGroup:'Git 저장소 / root / sub',branch:'feature/subgroup-menu',target:'main',author:'김신한',commit:'7e14d754',status:'running',trigger:'Push',jobs:['manual','running','passed','pending','failed','canceled','skipped','created'],action:'cancel'},
    {id:'2847502388',updatedAt:'38분 전',title:'GNB breadcrumb overflow policy 적용',repo:'root-sub-repo',repoGroup:'Git 저장소 / root / sub',branch:'main',target:'main',author:'김신한',commit:'3c96a12b',status:'finished',result:'passed',trigger:'Push',jobs:['passed','passed','passed','passed','passed','passed','passed','passed']},
    {id:'2847502374',updatedAt:'1시간 전',title:'Contract test for account limits API',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',branch:'feature/account-limit',target:'develop',author:'이신한',commit:'b71c2f09',status:'failed',trigger:'Branch',jobs:['manual','passed','passed','pending','failed','canceled','skipped','created'],action:'rerun'},
    {id:'2847502369',updatedAt:'2시간 전',title:'MR 생성 화면 validation rule 정리',repo:'customer-web-portal',repoGroup:'Digital Banking / Web',branch:'feature/mr-validation',target:'develop',author:'박신한',commit:'c41a79ee',status:'finished',result:'canceled',trigger:'Manual',jobs:['manual','running','passed','pending','canceled','skipped','created','created'],action:'rerun'},
    {id:'2847502362',updatedAt:'2시간 전',title:'Security scan schedule trigger',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',branch:'release/2026.05',target:'main',author:'정신한',commit:'e0d1ab42',status:'running',trigger:'Schedule',jobs:['manual','running','passed','pending','created','created','created','created'],action:'cancel'}
  ];
  const securityValidations = [
    {id:'SEC-204',mrId:128,mrTitle:'인증 정책 응답값 개선',repo:'mobile-banking-api',projectKey:'digital-banking',project:'Digital Banking / Mobile',branch:'feature/login-policy → develop',author:'Jito',mrStatus:'blocked',vstatus:'failed',vlabel:'Failed',policy:'blocked',policyLabel:'병합 불가',severity:{critical:2,high:3,medium:1,low:0},lastCheckedAt:'20분 전'},
    {id:'SEC-203',mrId:126,mrTitle:'계좌 목록 캐싱 개선',repo:'customer-web-portal',projectKey:'digital-banking',project:'Digital Banking / Web',branch:'feature/account-cache → develop',author:'Min',mrStatus:'open',vstatus:'running',vlabel:'Running',policy:'pending',policyLabel:'검증 중',severity:{critical:0,high:0,medium:0,low:0},lastCheckedAt:'진행 중'},
    {id:'SEC-198',mrId:121,mrTitle:'로그인 실패 메시지 정리',repo:'mobile-banking-api',projectKey:'digital-banking',project:'Digital Banking / Mobile',branch:'fix/login-message → main',author:'Han',mrStatus:'merged',vstatus:'pass',vlabel:'Pass',policy:'allowed',policyLabel:'병합 가능',severity:{critical:0,high:0,medium:0,low:1},lastCheckedAt:'어제'},
    {id:'SEC-194',mrId:118,mrTitle:'외부 인증 모듈 교체',repo:'partner-payment-sdk',projectKey:'partner-workspace',project:'Partner Workspace',branch:'feature/external-auth → develop',author:'Partner Dev',mrStatus:'blocked',vstatus:'failed',vlabel:'Failed',policy:'blocked',policyLabel:'병합 불가',severity:{critical:1,high:2,medium:0,low:0},lastCheckedAt:'3일 전'},
    {id:'SEC-189',mrId:116,mrTitle:'공통 버튼 컴포넌트 접근성 개선',repo:'common-ui-components',projectKey:'platform-center',project:'Platform Center',branch:'feature/a11y-button → develop',author:'Seo',mrStatus:'merged',vstatus:'warning',vlabel:'Warning',policy:'allowed',policyLabel:'조건부 허용',severity:{critical:0,high:0,medium:2,low:3},lastCheckedAt:'5일 전'}
  ];
  const forms = {
    repositoryTemplates:['Spring','Gitlab','Android','iOS(Swift)','React Web','Node API'],
    repositoryMembers:['jito@company.com','min@company.com'],
    mrRepositories:['mobile-banking-api','customer-web-portal','common-ui-components'],
    sourceBranches:['feature/login-policy','feature/account-cache','fix/login-message','feature/account-limit'],
    targetBranches:['develop','main','release'],
    branchCommits:{
      source:{'feature/login-policy':{title:'로그인 정책 예외 케이스 응답값 개선',author:'Jito',sha:'a82f4c1',time:'20분 전'},'feature/account-cache':{title:'계좌 목록 캐싱 전략 적용',author:'Min',sha:'c92aa11',time:'2시간 전'},'fix/login-message':{title:'로그인 실패 메시지 문구 정리',author:'Han',sha:'9ca7e31',time:'어제'},'feature/account-limit':{title:'account limits API contract update',author:'김신한',sha:'7e14d754',time:'1시간 전'}},
      target:{develop:{title:'develop 브랜치 빌드 안정화',author:'Min',sha:'d31e92a',time:'1시간 전'},main:{title:'main 브랜치 최신 릴리즈 태그 적용',author:'Jito',sha:'a1b2c3d',time:'3시간 전'},release:{title:'release/2026.05 보안 점검 완료',author:'Security',sha:'f40b91c',time:'어제'}}
    },
    reviewers:[{email:'min@company.com',role:'리뷰어'},{email:'security@company.com',role:'승인자'}]
  };
  window.GITDDN_MOCK = { common:{status}, user:{currentUser:users[0], users}, repositories:{list:repositories, detail:repositories[0]}, mergeRequests:{list:mergeRequests, detail:mergeRequests[0]}, pipelines:{list:pipelines, detail:pipelines[0]}, security:{validations:securityValidations, detail:securityValidations[0]}, forms };
})();

(function(){ window.GITDDN_MOCK.audit = window.GITDDN_MOCK.audit || { summaryCards: [], logs: [] }; })();
