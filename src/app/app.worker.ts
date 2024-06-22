/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  generateReport(data);

  postMessage('sended');
});

async function generateReport(data: any): Promise<any> {
  sleep(3000).then(() => {
    console.log('Wait!');
    let check = new Date().getSeconds() === 0;
    if (check) {
      console.log('Sucess!');
      return true;
    }
    return generateReport(data);
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
